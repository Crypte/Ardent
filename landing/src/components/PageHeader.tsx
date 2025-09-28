interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
      <div className={'text-center py-12'}>
        <h1 className="text-5xl font-bold mb-3">{title}</h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>
  );
}