import React from 'react';
import { Card, List, ListItem, Typography } from '@mui/material';

export default function EmotionalInsights({ patterns }: { patterns: EmotionalPattern[] }) {
  return (
    <Card className="insights-card">
      <List>
        {patterns.map(pattern => (
          <ListItem key={pattern.activity}>
            <Typography>
              When you {pattern.activity}, you often feel {pattern.associatedEmotions.map(e => e.name).join(', ')}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
} 