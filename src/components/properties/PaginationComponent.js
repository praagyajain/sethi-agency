import { useState } from "react";
import { Pagination, Box } from "@mui/material";

export default function PaginationComponent({ onPageChange }) {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "20vh",
      }}
    >
      <Pagination
        count={10}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "#ede6dc",
            color: "#2b2118",
            borderRadius: 2,
            margin: "0.5rem",
            "&.Mui-selected": {
              backgroundColor: "#2b2118",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#cbbfa9",
            },
          },
        }}
      />
    </Box>
  );
}
