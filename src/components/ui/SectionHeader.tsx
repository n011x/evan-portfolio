import { Reveal } from "@/components/motion/Reveal";

type Props = {
  id: string;
  name: string;
  right?: string;
  note?: string;
};

/**
 * Every band is addressed at its corners: ID left, name, type right (R12).
 * The ID is rendered with the pixel primitive.
 */
export function SectionHeader({ id, name, right, note }: Props) {
  return (
    <div className="wrap">
      <Reveal kind="rule" className="rule-t block" />
      <div className="grid12 items-start pt-3 pb-8 md:pb-10">
        <Reveal className="col-span-1">
          <span
            className="pixel block text-[34px] leading-none md:text-[42px]"
            style={{ color: "var(--ghost-index)" }}
          >
            /{id}
          </span>
        </Reveal>
        <Reveal className="col-span-3 md:col-span-2 lg:col-span-4">
          <h2 className="h3">{name}</h2>
        </Reveal>
        {note ? (
          <p className="nano col-span-4 md:col-span-2 lg:col-span-4 mt-3 md:mt-0 max-w-[44ch]">
            {note}
          </p>
        ) : null}
        {right ? (
          <div className="col-span-4 md:col-span-1 md:col-start-6 lg:col-span-3 lg:col-start-10 md:justify-self-end mt-3 md:mt-0">
            <span className="nano">{right}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
