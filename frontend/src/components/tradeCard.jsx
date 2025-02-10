import { Box, Card, CardContent, Typography } from "@mui/material";


function TradeCard({index}) {
  return (
    <Box>
      <Card
        key={index}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          padding: 4,
          maxWidth: 600,
          width: "100%",
          marginTop: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#134E5E" }}
          >
            Introduction: nob
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Phase ID:</strong> phaseid
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Amount Needed:</strong>total
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Description:</strong> desc
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>PAN No:</strong> panno
          </Typography>
        </CardContent>
      </Card>

      
    </Box>
  );
}

export default TradeCard;
