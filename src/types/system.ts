export type NodeType = 'edge' | 'microservice' | 'ai' | 'database' | 'queue' | 'security';

export interface ArchitectureNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  status: 'healthy' | 'warning' | 'active';
  tech: string;
  description: string;
  metrics: {
    latency: string;
    throughput: string;
    memory: string;
  };
  apis: string[];
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  protocol: string;
  animated?: boolean;
}

export interface ColumnDefinition {
  name: string;
  type: string;
  constraints: string;
  description: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  primaryKey: string;
  columns: ColumnDefinition[];
  indexes: string[];
  relationships: string[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'SUBSCRIBE';
  path: string;
  summary: string;
  description: string;
  requestBody?: string;
  responseBody: string;
  rateLimit: string;
  authRequired: boolean;
}

export interface AiAgent {
  id: string;
  name: string;
  role: string;
  model: string;
  systemPrompt: string;
  tools: string[];
  memoryType: string;
  connections: string[];
  sampleQuery: string;
  sampleResponse: string;
}

export interface CloudComponent {
  name: string;
  provider: 'AWS' | 'GCP' | 'Azure' | 'Multi-Cloud';
  service: string;
  tier: string;
  monthlyCost: number;
  region: string;
  autoScaleConfig: string;
}

export interface SecurityPolicy {
  category: string;
  mechanism: string;
  description: string;
  compliance: string[];
}

export interface UserStep {
  step: number;
  title: string;
  actor: string;
  action: string;
  systemResponse: string;
  impact: string;
}

export interface EventTopic {
  name: string;
  producer: string;
  consumers: string[];
  payloadFormat: string;
  retention: string;
}

export interface DeploymentStage {
  stage: string;
  tool: string;
  description: string;
  snippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface TechItem {
  category: string;
  name: string;
  badge: string;
  reasoning: string;
}

export interface SystemArchitecture {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  stats: {
    qps: string;
    latency: string;
    estimatedMonthlyCost: string;
    securityScore: string;
    nodeCount: number;
    agentCount: number;
  };
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  databaseSchema: DatabaseTable[];
  apiEndpoints: ApiEndpoint[];
  aiAgents: AiAgent[];
  cloudArchitecture: CloudComponent[];
  securityModel: SecurityPolicy[];
  userFlow: UserStep[];
  eventFlow: EventTopic[];
  deploymentPlan: DeploymentStage[];
  techStack: TechItem[];
}
