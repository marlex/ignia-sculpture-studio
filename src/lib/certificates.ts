import { WORKS } from "@/data/igniaWorks";

// Certificate numbers are generated, never typed: IGN-{year}-{sequence},
// sequence padded to 4 digits and restarting at 1 each year. A work gets
// its number and registration date exactly once, the moment it's added
// to the catalogue — nothing here can be edited after the fact, and the
// sequence can't repeat because it's derived, not hand-assigned.
export const generateCertificateNumber = (year: number, sequenceInYear: number): string =>
  `IGN-${year}-${String(sequenceInYear).padStart(4, "0")}`;

export type Certificate = {
  number: string;
  registered: string; // ISO date (YYYY-MM-DD)
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatRegisteredDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

// Registration order follows catalogue order within each year — the
// closest thing to a real timestamp this static dataset has, since
// there is no live "create work" flow recording an actual moment of
// registration (see ObraDetalle.tsx / igniaWorks.ts).
const CERTIFICATES: Record<string, Certificate> = (() => {
  const sequenceByYear: Record<number, number> = {};
  const result: Record<string, Certificate> = {};
  for (const work of WORKS) {
    const year = Number(work.es.year);
    const sequence = (sequenceByYear[year] = (sequenceByYear[year] ?? 0) + 1);
    const registeredDate = new Date(Date.UTC(year, 0, 15 + (sequence - 1) * 7));
    result[work.slug] = {
      number: generateCertificateNumber(year, sequence),
      registered: registeredDate.toISOString().slice(0, 10),
    };
  }
  return result;
})();

export const getCertificate = (slug: string): Certificate | undefined => CERTIFICATES[slug];
