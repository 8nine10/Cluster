"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
// import "@uploadthing/react/styles.css";


interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}


export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

    const fileType = value?.split("|")[1]?.split(".")[1];
    const fileName = value?.split("|")[1]?.split(".")[0];
    const fileURL = value?.split("|")[0]
    
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={fileURL}
                    alt="Upload"
                    className="rounded-full"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    if(value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {fileName}
                </a>
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute -top-0 -right-0 shadow-sm">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url + "|" + res?.[0].name);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}