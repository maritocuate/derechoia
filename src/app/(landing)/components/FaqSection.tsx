import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FaqSection() {
  return (
    <Accordion type="single" collapsible className="text-left">
      <AccordionItem value="item-1">
        <AccordionTrigger>Que motor de AI utiliza Legisbot?</AccordionTrigger>
        <AccordionContent>
          Legisbot utiliza ChatGPT-3.5 y GPT-4 desde una base de datos
          vectoriales con documentos fundamentales del derecho penal.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Con que tipo de soporte cuentan en caso de tener un problema?
        </AccordionTrigger>
        <AccordionContent>Contamos con un sistema de tickts.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Con que tipo de soporte cuentan en caso de tener un problema?
        </AccordionTrigger>
        <AccordionContent>Contamos con un sistema de tickts.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Con que tipo de soporte cuentan en caso de tener un problema?
        </AccordionTrigger>
        <AccordionContent>Contamos con un sistema de tickts.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
