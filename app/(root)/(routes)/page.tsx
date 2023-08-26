import SearchInput from "@/components/SearchInput";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="h-full p-4 space-y-2">
        <SearchInput />
      </div>
    </div>
  );
}
