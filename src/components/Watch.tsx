export default function Watch({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[430px] w-[352px] rounded-[3.5rem] border border-white/50">
      <div className="absolute left-full top-20 ml-px h-16 w-3 rounded-r-md bg-white/50" />
      <div className="absolute left-full top-56 ml-px h-24 w-1 rounded-r-sm bg-white/50" />
      <div className="absolute inset-0 flex p-8">{children}</div>
    </div>
  );
}
