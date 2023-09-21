"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { theme } from "@/components/Theme";

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // TODO add feedback if no file is selected
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    // TODO use axios or another solution
    const response = await fetch("http://localhost:3005/api/file", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // TODO use saveAs from file-saver
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${file.name.split(".").slice(0, -1).join(".")}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setFile(null);
      alert("File converted successfully");
    } else {
      alert("Failed to convert audio");
    }
  };
  return (
    <Box sx={{ display: "flex", padding: theme.spacing(2) }}>
      <Stack spacing={2}>
        <Button
          component="label"
          variant="contained"
          startIcon={<VideoFileIcon />}
        >
          Select file
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept={"video/mp4"}
          />
        </Button>
        <Button
          variant={"contained"}
          onClick={handleConvert}
          disabled={!file}
          startIcon={<ImageIcon />}
        >
          Convert
        </Button>
      </Stack>
    </Box>
  );
}
