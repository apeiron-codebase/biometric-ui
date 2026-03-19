import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Props = {
  onExportCSV: () => void;
  onExportPDF: () => void;
  hasData: boolean;
};

export default function ExportButtons({ onExportCSV, onExportPDF, hasData }: Props) {
  return (
    <div className="flex gap-3">
      <Button variant="outline" size="sm" onClick={onExportCSV} disabled={!hasData}>
        <Download className="mr-2 h-4 w-4" />
        Export to CSV
      </Button>
      <Button variant="outline" size="sm" onClick={onExportPDF} disabled={!hasData}>
        <Download className="mr-2 h-4 w-4" />
        Export to PDF
      </Button>
    </div>
  );
}