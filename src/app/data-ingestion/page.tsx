'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {toast} from "@/hooks/use-toast"
import {useRouter} from "next/navigation";

let uploadedAssets: any[] = []; // In-memory store for uploaded assets

const DataIngestionPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    toast({ title: "Uploading Data", description: "Processing file..." });
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        try {
          if (selectedFile.type === 'text/csv' || selectedFile.name.toLowerCase().endsWith('.csv')) {
            uploadedAssets = [];

            const parsedCsv = csvToJson(result);
            console.log("CSV Data for workflow integration:", parsedCsv);
            uploadedAssets.push(...parsedCsv);
            toast({
              title: "Success",
              description: "CSV data successfully ingested into workflow!",
              })
              

          } else if (selectedFile.type === 'application/json' || selectedFile.name.toLowerCase().endsWith('.json')) {

            uploadedAssets = [];

            try {
              const parsed = JSON.parse(result);
                if (Array.isArray(parsed)) {
                    uploadedAssets.push(...parsed);
                  } else {
                    uploadedAssets.push(parsed); // Wrap in array if not an array
                  }

                toast({
                  title: "Success",
                  description: "JSON data successfully ingested into workflow!",
                 
                })
            } catch(error){
                console.error('JSON parsing error', error);
                toast({
                  title: "Error",
                  description: "JSON parsing failed",
                  variant: "destructive"
                });
            }

          }else {
            toast({
              title: "Error",
              description: "Unsupported file type. Please upload CSV or JSON.",
              variant: "destructive"
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "File Ingestion failed",
            variant: "destructive"
          })
        }
      }
    };
    reader.readAsText(selectedFile);
  };

  const csvToJson = (csv: string): any[] => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j] ? currentLine[j].trim() : '';
      }
      result.push(obj);
    }
    return result;
  };

  return (
    <div className="p-6 rounded-md shadow-md bg-background">
      <h1 className="text-2xl font-semibold mb-4">Data Ingestion</h1>
      <p className="mb-4 text-muted-foreground">Ingest asset data from various sources.</p>

      <div className="mb-4">
          <Label htmlFor="fileUpload" className="mb-2 block">Upload File</Label>
          <input type="file" id="fileUpload" accept=".csv, .json" onChange={handleFileChange} className="mt-1"/>
      </div>
      <Button onClick={handleUpload} disabled={!selectedFile} className="mt-4">
          Upload
      </Button>
      
      <Button onClick={() => router.back()} className="mt-4">        
        Back
      </Button>
    </div>
  );
};

export default DataIngestionPage;
