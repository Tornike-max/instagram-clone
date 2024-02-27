import { useState } from "react";
import { useShowToast } from "./useShowToast";

export function usePreviewImg() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("error", "Image size must be less than 2mb", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("error", "Please upload an image file", "error");
    }
  };

  return { selectedFile, handleImageChange, setSelectedFile };
}
