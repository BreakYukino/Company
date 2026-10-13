// Swap this configuration for another system; the login layout stays shared.
export const brands = { agriculture: {
  id: 'agriculture',
  home: '/',
  name: 'AI 智慧中心',
  subtitle: '智慧农业管理平台',
  title: ['读懂每一寸土地，', '让生长有据可依。'],
  description: '连接土地与数据，让每一次决策更有把握。',
  image: '/agriculture-morning.png',
  color: '#294e3d',
  welcome: '从这里，开始今天的智慧管理。',
  footer: '扎根土地 · 智联生长',
}, signage: {
  id: 'signage',
  home: '/signage',
  name: '斐擎元芯',
  subtitle: 'Faylin Origin · IoT 广告标识',
  title: ['懂行业的', 'AI 决策底座'],
  description: '在真实感知数据之上做决策。每一条建议，都能追溯到源头数据。',
  image: '/signage-plaza.png',
  color: '#bb4b0d',
  welcome: '连接每一处标识，让管理更有依据。',
  footer: '九地技术 · IoT 广告标识',
  principle: 'AI 只出建议，执行由人确认。',
  trace: '设备 → 网关 → 通道 → 表，逐层可查',
  disclaimer: 'AI 仅提供决策建议，不会自动下发任何控制指令。',
} }
export const brand = location.pathname.replace(/\/$/, '') === '/signage' ? brands.signage : brands.agriculture
