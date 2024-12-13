import React from 'react';
import { EmotionalJournal } from './components';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <EmotionalJournal />
    </Container>
  );
}

export default App; 