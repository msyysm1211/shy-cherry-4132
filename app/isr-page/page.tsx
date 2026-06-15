// app/isr-page/page.tsx

// 定义重新验证的时间间隔（秒）
export const revalidate = 10;

interface DataResponse {
  title: string;
  content: string;
  timestamp: string;
  views: number;
}

async function getData(): Promise<DataResponse> {
  // 注意：在生产环境构建时，localhost 可能不可用。
  // 最好使用绝对路径或环境变量，但在本地测试 npm start 时 localhost 是有效的。
  const res = await fetch('http://localhost:3000/api/data', {
    // 缓存策略：force-cache 确保 ISR 行为生效
    next: { revalidate: 10 } 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <hr />
      <p><strong>Server Timestamp:</strong> {data.timestamp}</p>
      <p><strong>Random Views:</strong> {data.views}</p>
      <p style={{ color: '#666', marginTop: '20px' }}>
        刷新页面查看内容是否变化。每 10 秒后台会重新生成此页面。
      </p>
    </main>
  );
}