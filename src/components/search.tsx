import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="https://example.com"
        className="md:w-[400px] lg:w-[600px]"
      />
    </div>
  );
}
