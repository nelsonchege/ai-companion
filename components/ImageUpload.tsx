"use client";

import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";
import { UploadButton } from "@/utils/uploadthing";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div
        className="
            p-4 
            border-4 
            border-dashed
            border-primary/10 
            rounded-lg 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            space-y-2 
            items-center 
            justify-center
          "
      >
        <div className="relative h-40 w-40">
          <Image
            fill
            alt="Upload"
            src={value || placeholder}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files:-------> ", res);
          if (res && res[0]) {
            console.log("Files:<--------- ", res);
            onChange(res[0].url);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
