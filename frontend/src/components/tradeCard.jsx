function TradeCard({ user }) {
  return (
    <Box>
      <Card
        key={user.doneeId || index}
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
            Introduction: {user.nob}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Phase ID:</strong> {user.phaseId}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Amount Needed:</strong> {user.totalAmount}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Description:</strong> {user.desc}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>PAN No:</strong> {user.panNo}
          </Typography>
        </CardContent>
      </Card>

      <Card
        key={user.doneeId || index}
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
            Introduction: {user.nob}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Phase ID:</strong> {user.phaseId}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            <strong>Amount Needed:</strong> {user.totalAmount}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Description:</strong> {user.desc}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>PAN No:</strong> {user.panNo}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
