
'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {toast} from "@/hooks/use-toast"
import {useRouter} from "next/navigation";

const DataIngestionPage = () => {
  const [csvData, setCsvData] = useState<string>('');
  const [jsonData, setJsonData] = useState<string>('');
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setCsvData(result);
        try {
          const parsedJson = csvToJson(result);
          setJsonData(JSON.stringify(parsedJson, null, 2));
          toast({
            title: "Success",
            description: "CSV parsed successfully",
          })
        } catch (error) {
          console.error('CSV to JSON conversion error:', error);
          toast({
            title: "Error",
            description: "CSV parsing failed",
            variant: "destructive"
          })
        }
      }
    };
    reader.readAsText(file);
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
        <Label htmlFor="csvUpload" className="mb-2 block">Upload CSV File:</Label>
        <input type="file" id="csvUpload" accept=".csv" onChange={handleFileUpload} className="mt-1"/>
      </div>

      <div className="mb-4">
        <Label htmlFor="csvData" className="mb-2 block">CSV Data:</Label>
        <Textarea id="csvData" value={csvData} readOnly className="mt-1 rounded-md shadow-sm"/>
      </div>

      <div>
        <Label htmlFor="jsonData" className="mb-2 block">JSON Data:</Label>
        <Textarea id="jsonData" value={jsonData} readOnly className="mt-1 rounded-md shadow-sm"/>
      </div>
      <Button onClick={() => router.back()} className="mt-4">
        Back
      </Button>
    </div>
  );
};

export default DataIngestionPage;
