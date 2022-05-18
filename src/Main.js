import { Typography, Input } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useConverter } from "./use-converter";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { example, notes } from "./example";

const inputStyle = {
  borderRadius: "0.25rem",
  padding: "1rem",
  background: "rgba(255, 255, 255, 0.08)",
  maxHeight: "50rem",
  width: "100%",
};

const inputRows = "28";

export function Main() {
  const [text, setText] = useState();
  const [isCopied, setIsCopied] = useState();
  const { convert, results } = useConverter();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const onInput = (event) => {
    setText(event.target.value);
  };

  const onPaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    setText(clipboardData.getData("Text")?.trim());
  };

  const onCopyOutputClick = () => {
    navigator.clipboard.writeText(results);
    setIsCopied(true);
  };

  const onClearInputClick = () => {
    setText("");
  };

  const onSeeExampleClick = () => {
    setText(example);
  }

  const onSnackbarClosed = () => {
    setIsCopied(false);
  };

  useEffect(() => {
    convert(text);
  }, [convert, text]);

  return (
    <Container>
      <Typography
        variant="h4"
        mt={5}
        sx={{ fontWeight: 300 }}
      >
        Template literals to object-notation converter
      </Typography>
      <Typography
        sx={{ marginBottom: "1.5rem", fontWeight: 200 }}
      >
        Tool to help you convert template literals CSS to object notation style
      </Typography>

      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 12 : 2}
        sx={{ marginBottom: "8rem" }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <Input
            multiline
            fullWidth
            placeholder="Template literals notation input, e.g. const style = css` ... `"
            rows={inputRows}
            value={text}
            sx={inputStyle}
            onInput={onInput}
            onPaste={onPaste}
          />
          <Button
            variant="outlined"
            color="primary"
            disabled={!!!text?.length}
            onClick={onClearInputClick}
            sx={{ position: "absolute", bottom: "-3rem", left: "0" }}
          >
            Clear
          </Button>
          <Button
            variant="outlined"
            color="primary"
            disabled={!!text?.length}
            onClick={onSeeExampleClick}
            sx={{ position: "absolute", bottom: "-3rem", left: "6rem" }}
          >
            See example
          </Button>
        </Box>

        <Box sx={{ position: "relative", width: "100%" }}>
          <Input
            multiline
            fullWidth
            readOnly
            value={results}
            placeholder="Object-notation output, e.g. const style = css({ ... })"
            rows={inputRows}
            sx={inputStyle}
          />
          <Button
            variant="contained"
            disabled={!!!text?.length}
            onClick={onCopyOutputClick}
            sx={{ position: "absolute", bottom: "-3rem", left: "0" }}
          >
            Copy output
          </Button>
        </Box>
      </Stack>
      

      {notes.map((note) => <Box key={note} sx={{ marginTop: '0.25rem' }}>{note}</Box>)}

      <Box sx={{ margin: '3rem 0', color: 'rgba(255, 255, 255, 0.5)' }}>Created by Sagi Oshri</Box>
      <Snackbar
        open={isCopied}
        autoHideDuration={6000}
        onClose={onSnackbarClosed}
        message="Output copied to clipboard!"
      />
    </Container>
  );
}
