import Grid from "@mui/material/Grid";

export default function NoPermission() {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <h1>No Permission</h1>
      <p>{"You don't have permission to access this page."}</p>
    </Grid>
  );
}
