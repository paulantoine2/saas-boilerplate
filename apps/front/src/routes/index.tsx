import { Button } from '@/components/ui/button';
import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: () => {
    console.log('before load');
  },
});

function Index() {
  const router = useRouter();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button onClick={() => router.invalidate()}>click</Button>
    </div>
  );
}
