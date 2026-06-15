// app/isr-demo/page.tsx

// 关键配置：设置重新验证时间为 10 秒
export const revalidate = 10;

// 模拟一个异步数据获取函数
// 在实际项目中，这里可以是 fetch 外部 API (如 https://api.example.com/data)
// 但不能是 fetch('http://localhost:...') 除非你确定构建环境能访问
async function getMockData() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    title: "Next.js ISR 演示",
    content: "此页面使用增量静态再生 (ISR) 技术。",
    timestamp: new Date().toLocaleString(),
    randomValue: Math.floor(Math.random() * 1000),
  };
}

export default async function ISRPage() {
  const data = await getMockData();

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong> 服务器生成时间:</strong> {data.timestamp}
        </p>
        <p>
          <strong>随机值:</strong> {data.randomValue}
        </p>
      </div>
      <p style={{ marginTop: "20px", color: "#666" }}>
        提示：多次刷新页面，时间戳不会立即改变。等待 10
        秒后再刷新，可能会看到更新后的时间。
      </p>
    </main>
  );
}
