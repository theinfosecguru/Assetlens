'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {dataQuery} from '@/ai/flows/data-query-flow';

interface AiQueryProps {
  data: string;
}

const AiQuery: React.FC<AiQueryProps> = ({data}) => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuery = async () => {
    setIsLoading(true);
    try {
      const result = await dataQuery({query: query, data: data});
      setResponse(result.response);
    } catch (error) {
      console.error('Error querying data:', error);
      setResponse('Error occurred while processing the query.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Data Query</CardTitle>
        <CardDescription>Ask questions about your data.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="query">Query:</Label>
          <Textarea
            id="query"
            placeholder="Enter your query here."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleQuery} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Response'}
        </Button>
        {response && (
          <div className="grid gap-2">
            <Label htmlFor="response">Response:</Label>
            <Textarea id="response" value={response} readOnly />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiQuery;
