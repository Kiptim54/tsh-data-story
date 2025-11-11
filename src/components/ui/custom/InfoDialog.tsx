import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../button";
import { BookOpen } from "lucide-react";

type InfoDialogProps = {
  open: boolean;
  onClick: () => void;
};
export default function InfoDialog(props: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='sticky bottom-2 left-5 size-12  rounded-full hover:cursor bg-primary-500 p-0 hover:bg-secondary-500 hover:text-primary-100 text-primary-100 shadow-lg z-50'
          size='sm'
          onClick={props.onClick}
          aria-label='Open Info Dialog'
        >
          <BookOpen className='text-white' />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[90%]'>
        <DialogHeader>
          <DialogTitle className='text-center mb-4 uppercase'>
            Lancet Laboratory Scale
          </DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader className='bg-slate-200 rounded-md p-2'>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>TSH (μIU/mL)</TableHead>
              <TableHead>FT3 (pmol/L)</TableHead>
              <TableHead>FT4 (pmol/L)</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Normal (Euthyroid)</TableCell>
              <TableCell>0.4 – 4.0</TableCell>
              <TableCell>3.1 – 6.8</TableCell>
              <TableCell>12 – 22</TableCell>
              <TableCell>
                Thyroid function within reference range; no clinical
                abnormality.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='font-medium'>
                Subclinical Hypothyroidism
              </TableCell>
              <TableCell>&gt; 4.0 – 10.0</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>
                TSH mildly elevated; T3 and T4 remain normal. Early or mild
                hypothyroidism.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='font-medium'>
                Overt Hypothyroidism
              </TableCell>
              <TableCell>&gt; 10.0</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>&lt; 12</TableCell>
              <TableCell>
                TSH high with low FT4; clinical signs of hypothyroidism likely
                present.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='font-medium'>
                Subclinical Hyperthyroidism
              </TableCell>
              <TableCell>&lt; 0.4</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>
                TSH suppressed but T3/T4 within range; may be early
                hyperthyroidism.
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='font-medium'>
                Overt Hyperthyroidism
              </TableCell>
              <TableCell>&lt; 0.1</TableCell>
              <TableCell>&gt; 6.8</TableCell>
              <TableCell>&gt; 22</TableCell>
              <TableCell>
                TSH very low with elevated FT3/FT4; consistent with
                hyperthyroidism.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
