import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box, FormControl, FormHelperText, InputLabel, Avatar } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function SingleFileUpload({
  label,
  name,
  error,
  showUrl, // Optional prop for image URL
  setValue = () => null,
  disabled = false,
  ...restProps
}) {
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleFileChange = (e) => {
    const file = e.currentTarget?.files[0];
    if (file) {
      // Create a temporary URL for the uploaded file
      const url = URL.createObjectURL(file);
      setImageUrl(url); // Update the image URL
      setValue(name, file); // Set the file value
    }
  };
  React.useMemo(() => {
    if (showUrl) setImageUrl(showUrl)
  }, [showUrl])

  return (
    <Box>
      <FormControl error={error?.error}>
        {/* Display the image if imageUrl is provided */}
        {imageUrl && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={imageUrl}
              alt="Uploaded Image"
              style={{ width: 'auto', height: 150, objectFit: 'cover' }} // Adjust size as needed
            />
          </Box>
        )}

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={disabled}
        >
          {label ?? 'Upload file'}
          <VisuallyHiddenInput
            type="file"
            name={name}
            onChange={handleFileChange} // Handle file change
            {...restProps}
            disabled={disabled}
          />
        </Button>
        {error?.error ? <FormHelperText>{error?.helperText}</FormHelperText> : ''}
      </FormControl>
    </Box>
  );
}

const CloudUploadIcon = () => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="#ffffff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.341 6.159C7.165 3.736 9.388 2 12 2c3.314 0 6 2.793 6 6.238 2.21 0 4 1.863 4 4.16 0 1.539-.804 2.883-2 3.602M6.32 6.206C3.88 6.551 2 8.726 2 11.358c0 1.7.785 3.21 2 4.159" />
    <path d="M12 12v10" />
    <path d="m8 16 2-2 2-2 4 4" />
  </svg>
);