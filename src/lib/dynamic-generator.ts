import { SystemArchitecture, ArchitectureNode, ArchitectureEdge, DatabaseTable, ApiEndpoint, AiAgent, CloudComponent, SecurityPolicy, UserStep, EventTopic, DeploymentStage, TechItem } from '@/types/system';
import { PREBUILT_TEMPLATES } from './templates';

export function generateArchitectureFromPrompt(prompt: string): SystemArchitecture {
  const cleanPrompt = prompt.trim().toLowerCase();

  // Check prebuilt templates matching key words
  if (cleanPrompt.includes('hospital') || cleanPrompt.includes('health') || cleanPrompt.includes('medical')) {
    return PREBUILT_TEMPLATES['smart-hospital'];
  }
  if (cleanPrompt.includes('drone') || cleanPrompt.includes('delivery platform') || cleanPrompt.includes('flight') || cleanPrompt.includes('airspace')) {
    return PREBUILT_TEMPLATES['drone-delivery'];
  }
  if (cleanPrompt.includes('warehouse') || cleanPrompt.includes('robot') || cleanPrompt.includes('fulfillment') || cleanPrompt.includes('logistics')) {
    return PREBUILT_TEMPLATES['autonomous-warehouse'];
  }

  // Dynamic Generator for Custom System Prompts!
  const titleWords = prompt.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const systemName = titleWords.length > 4 ? `${titleWords} Core Platform` : `${titleWords} Infrastructure Engine`;
  const slug = prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const nodes: ArchitectureNode[] = [
    {
      id: 'edge-api-gateway',
      label: 'Global Edge Ingress & WAF',
      type: 'edge',
      x: 100,
      y: 180,
      status: 'healthy',
      tech: 'Cloudflare Workers / Envoy / gRPC',
      description: 'Ingests inbound client requests, enforces TLS 1.3 encryption, rate limiting, and DDoS mitigation.',
      metrics: { latency: '1.8ms', throughput: '65,000 req/s', memory: '1.6 GB' },
      apis: ['/v1/api/ingress', '/v1/auth/token'],
    },
    {
      id: 'core-orchestrator',
      label: `${systemName} Microservice Core`,
      type: 'microservice',
      x: 340,
      y: 280,
      status: 'healthy',
      tech: 'Go 1.22 / Tokio Rust / REST & gRPC',
      description: `Primary business logic service managing workflows and domain state for ${prompt}.`,
      metrics: { latency: '6.4ms', throughput: '32,000 req/s', memory: '4.2 GB' },
      apis: [`/v1/${slug}/process`, `/v1/${slug}/status`],
    },
    {
      id: 'ai-core-agent',
      label: 'Primary AI Decision Agent',
      type: 'ai',
      x: 340,
      y: 100,
      status: 'active',
      tech: 'Gemini 3.6 Pro / PyTorch / LangChain',
      description: `Autonomous AI agent performing real-time inference, anomaly detection, and predictive synthesis for ${prompt}.`,
      metrics: { latency: '18.2ms', throughput: '6,400 infer/s', memory: '16 GB VRAM' },
      apis: ['/v1/ai/predict', '/v1/ai/synthesize'],
    },
    {
      id: 'secondary-ai-agent',
      label: 'AI Safety & Audit Agent',
      type: 'ai',
      x: 580,
      y: 100,
      status: 'active',
      tech: 'Claude 3.5 / Guardrails AI / Llama 3',
      description: 'Validates AI outputs, verifies compliance guardrails, and mitigates hallucinated actions.',
      metrics: { latency: '12.0ms', throughput: '4,100 infer/s', memory: '8 GB' },
      apis: ['/v1/ai/verify-policy'],
    },
    {
      id: 'relational-db',
      label: 'PostgreSQL Relational DB Cluster',
      type: 'database',
      x: 580,
      y: 280,
      status: 'healthy',
      tech: 'PostgreSQL 16 + pgvector',
      description: 'Primary ACID transactional database storing account profiles, system logs, and relational state.',
      metrics: { latency: '2.4ms', throughput: '45,000 write/s', memory: '32 GB' },
      apis: ['/internal/db/postgres-query'],
    },
    {
      id: 'vector-search-db',
      label: 'Pinecone Vector Knowledge Base',
      type: 'database',
      x: 820,
      y: 100,
      status: 'healthy',
      tech: 'Pinecone / Qdrant Vector Engine',
      description: 'High-speed vector index storing embeddings for semantic retrieval and long-term agent memory.',
      metrics: { latency: '8.1ms', throughput: '8,500 query/s', memory: 'Cloud Pods' },
      apis: ['/internal/vector/semantic-search'],
    },
    {
      id: 'event-stream-broker',
      label: 'Apache Kafka Event Spine',
      type: 'queue',
      x: 340,
      y: 440,
      status: 'active',
      tech: 'Apache Kafka 3.7 / Redpanda',
      description: 'Decoupled pub/sub event backbone routing real-time domain events across microservices.',
      metrics: { latency: '1.2ms', throughput: '180,000 msg/s', memory: '12 GB' },
      apis: [`kafka://${slug}-events`, `kafka://${slug}-alerts`],
    },
    {
      id: 'iam-security-mesh',
      label: 'Zero Trust Auth & Secret Mesh',
      type: 'security',
      x: 100,
      y: 380,
      status: 'healthy',
      tech: 'HashiCorp Vault / OAuth 2.0 / mTLS',
      description: 'Issues cryptographic tokens, manages secret rotation, and enforces RBAC permission policies.',
      metrics: { latency: '0.9ms', throughput: '100,000 cert/s', memory: '2.5 GB' },
      apis: ['/v1/auth/jwt-issue', '/v1/auth/mtls-cert'],
    },
  ];

  const edges: ArchitectureEdge[] = [
    { id: 'dyn-e1', from: 'edge-api-gateway', to: 'core-orchestrator', label: 'Client Ingress API', protocol: 'HTTPS / gRPC', animated: true },
    { id: 'dyn-e2', from: 'edge-api-gateway', to: 'ai-core-agent', label: 'AI Inference Stream', protocol: 'WebSockets', animated: true },
    { id: 'dyn-e3', from: 'ai-core-agent', to: 'secondary-ai-agent', label: 'Verification Guardrail', protocol: 'gRPC' },
    { id: 'dyn-e4', from: 'ai-core-agent', to: 'vector-search-db', label: 'Vector RAG Query', protocol: 'HTTPS Vector API' },
    { id: 'dyn-e5', from: 'core-orchestrator', to: 'relational-db', label: 'Transactional Write', protocol: 'Postgres SQL TCP' },
    { id: 'dyn-e6', from: 'core-orchestrator', to: 'event-stream-broker', label: 'Domain Event Pub', protocol: 'Kafka Protocol', animated: true },
    { id: 'dyn-e7', from: 'iam-security-mesh', to: 'edge-api-gateway', label: 'Token Verification', protocol: 'JWT / mTLS' },
  ];

  const databaseSchema: DatabaseTable[] = [
    {
      name: `${slug.replace(/-/g, '_')}_records`,
      description: `Core transactional database table for ${prompt}`,
      primaryKey: 'record_id (UUID)',
      columns: [
        { name: 'record_id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Unique entity GUID' },
        { name: 'tenant_id', type: 'VARCHAR(64)', constraints: 'NOT NULL', description: 'Multi-tenant isolate ID' },
        { name: 'status', type: 'VARCHAR(32)', constraints: 'NOT NULL DEFAULT \'ACTIVE\'', description: 'Entity workflow status' },
        { name: 'payload_metadata', type: 'JSONB', constraints: 'NOT NULL', description: 'Structured JSON state attributes' },
        { name: 'embedding', type: 'vector(1536)', constraints: 'NULLABLE', description: 'OpenAI 1536-dim vector embedding' },
        { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Record creation timestamp' },
      ],
      indexes: [
        `CREATE INDEX idx_${slug.replace(/-/g, '_')}_tenant ON ${slug.replace(/-/g, '_')}_records(tenant_id, status)`,
        `CREATE INDEX idx_${slug.replace(/-/g, '_')}_vector ON ${slug.replace(/-/g, '_')}_records USING hnsw (embedding vector_cosine_ops)`,
      ],
      relationships: [`${slug.replace(/-/g, '_')}_records.record_id -> audit_logs.entity_id`],
    },
    {
      name: 'system_audit_logs',
      description: 'Immutable security and audit log repository',
      primaryKey: 'log_id (BIGSERIAL)',
      columns: [
        { name: 'log_id', type: 'BIGSERIAL', constraints: 'PRIMARY KEY', description: 'Monotonic log counter' },
        { name: 'entity_id', type: 'UUID', constraints: 'NOT NULL', description: 'Target entity ID' },
        { name: 'actor_role', type: 'VARCHAR(48)', constraints: 'NOT NULL', description: 'Service or user executing action' },
        { name: 'action', type: 'VARCHAR(128)', constraints: 'NOT NULL', description: 'Operation executed' },
        { name: 'timestamp', type: 'TIMESTAMPTZ', constraints: 'DEFAULT NOW()', description: 'Event timestamp' },
      ],
      indexes: ['CREATE INDEX idx_audit_timestamp ON system_audit_logs(timestamp DESC)'],
      relationships: [],
    },
  ];

  const apiEndpoints: ApiEndpoint[] = [
    {
      id: 'dyn-api-1',
      method: 'POST',
      path: `/v1/${slug}/execute`,
      summary: `Execute ${titleWords} Request`,
      description: `Submits a dynamic command or natural language directive to the ${systemName}.`,
      requestBody: `{\n  "tenant_id": "tenant-corp-99",\n  "directive": "Execute automated workflow for ${prompt}",\n  "priority": "HIGH"\n}`,
      responseBody: `{\n  "job_id": "job-dyn-${Math.floor(Math.random() * 90000 + 10000)}",\n  "status": "QUEUED",\n  "estimated_completion_ms": 420,\n  "ai_agent_assigned": "Primary AI Decision Agent"\n}`,
      rateLimit: '25,000 req/min',
      authRequired: true,
    },
    {
      id: 'dyn-api-2',
      method: 'GET',
      path: `/v1/${slug}/status/{job_id}`,
      summary: 'Get Job Execution Status',
      description: 'Fetches real-time status and telemetry logs for an ongoing execution.',
      responseBody: `{\n  "job_id": "job-dyn-48102",\n  "state": "COMPLETED",\n  "metrics": {\n    "processing_time_ms": 142.8,\n    "tokens_consumed": 840\n  }\n}`,
      rateLimit: '100,000 req/min',
      authRequired: true,
    },
  ];

  const aiAgents: AiAgent[] = [
    {
      id: 'dyn-agent-1',
      name: `${titleWords} Core Director`,
      role: 'Autonomous System Orchestrator',
      model: 'Gemini 3.6 Pro / PyTorch',
      systemPrompt: `You are the lead AI system architect and controller for ${prompt}. Your task is to process inbound requests, route workloads to specialized microservices, analyze system health, and enforce automated error recovery.`,
      tools: ['dispatch_microservice_task()', 'query_vector_memory()', 'emit_kafka_alert()'],
      memoryType: 'Vector RAG + Ephemeral Session Buffer',
      connections: ['Edge Ingress Gateway', 'PostgreSQL DB', 'Pinecone Vector KB'],
      sampleQuery: `Analyze optimal processing pipeline for "${prompt}".`,
      sampleResponse: `SYSTEM PLAN INITIALIZED: 
1. Validated tenant credentials over OAuth2 mTLS.
2. Retrieved 14 historical context vectors from Pinecone.
3. Dispatched execution payload to Go microservice worker pool.
4. Calculated 99.98% expected SLA confidence score.`,
    },
  ];

  const cloudArchitecture: CloudComponent[] = [
    { name: 'AWS EKS Production Cluster', provider: 'AWS', service: 'Amazon EKS', tier: '4x c6i.4xlarge nodes', monthlyCost: 2150, region: 'us-east-1', autoScaleConfig: 'HPA 4 to 24 replicas' },
    { name: 'PostgreSQL RDS Multi-AZ', provider: 'AWS', service: 'Amazon RDS PostgreSQL', tier: 'db.r6g.2xlarge', monthlyCost: 1650, region: 'us-east-1', autoScaleConfig: 'Storage Auto-scale up to 5TB' },
    { name: 'Pinecone Vector Cloud', provider: 'Multi-Cloud', service: 'Pinecone Vector DB', tier: 'Serverless Podless Index', monthlyCost: 550, region: 'us-east-1', autoScaleConfig: 'Auto-scaling vector dimensions' },
    { name: 'Cloudflare Enterprise WAF', provider: 'Multi-Cloud', service: 'Cloudflare Anycast WAF', tier: 'Enterprise Tier', monthlyCost: 450, region: 'Global Edge', autoScaleConfig: 'DDoS mitigation enabled' },
  ];

  const securityModel: SecurityPolicy[] = [
    { category: 'Data Encryption', mechanism: 'AES-256 (At-Rest) + TLS 1.3 (In-Transit)', description: 'Envelope encryption using AWS KMS Customer Managed Keys (CMK).', compliance: ['SOC 2 Type II', 'ISO 27001'] },
    { category: 'Access Control', mechanism: 'OAuth 2.0 / OIDC + Zero Trust mTLS', description: 'Short-lived JWT tokens and SPIFFE cryptographic service identities.', compliance: ['NIST 800-207 Zero Trust'] },
  ];

  const userFlow: UserStep[] = [
    { step: 1, title: 'Inbound Request Ingestion', actor: 'Client Application', action: `Dispatches natural language directive for ${prompt}`, systemResponse: 'Edge WAF authenticates JWT and approves request ingress', impact: '< 2ms latency' },
    { step: 2, title: 'AI Reasoning Synthesis', actor: 'Primary AI Decision Agent', action: 'Queries Pinecone vector embeddings for domain context', systemResponse: 'Synthesizes optimized execution plan', impact: 'Sub-second AI reasoning' },
    { step: 3, title: 'Microservice Workflow Execution', actor: 'Core Microservice Engine', action: 'Executes parallel worker tasks and writes transaction to PostgreSQL', systemResponse: 'Pushes completion notification to Kafka event stream', impact: 'ACID transactional safety' },
  ];

  const eventFlow: EventTopic[] = [
    { name: `${slug}.job.created.v1`, producer: 'Edge Ingress Gateway', consumers: ['Core Microservice', 'AI Director Agent'], payloadFormat: 'JSON-LD', retention: '7 Days' },
    { name: `${slug}.job.completed.v1`, producer: 'Core Microservice', consumers: ['Audit Logger', 'Notification Gateway'], payloadFormat: 'Protobuf', retention: '30 Days' },
  ];

  const deploymentPlan: DeploymentStage[] = [
    { stage: 'Infrastructure as Code (IaC)', tool: 'Terraform', description: 'Provisions VPC, EKS cluster, RDS PostgreSQL, and security groups.', snippet: { filename: 'main.tf', language: 'hcl', code: `module "system_architect_vpc" {\n  source = "terraform-aws-modules/vpc/aws"\n  name   = "${slug}-prod-vpc"\n  cidr   = "10.0.0.0/16"\n  azs    = ["us-east-1a", "us-east-1b"]\n}` } },
    { stage: 'Container Manifests', tool: 'Kubernetes / Helm', description: 'Deploys microservices and AI agent pods.', snippet: { filename: 'helm-values.yaml', language: 'yaml', code: `replicaCount: 4\nimage:\n  repository: ecr.cloud/${slug}-core\n  tag: v1.0.0` } },
  ];

  const techStack: TechItem[] = [
    { category: 'Edge Ingress', name: 'Cloudflare Workers + Envoy', badge: 'Global Edge', reasoning: 'Delivers ultra-low latency request routing and DDoS protection.' },
    { category: 'AI Inference', name: 'Gemini 3.6 + PyTorch', badge: 'State of the Art', reasoning: 'High-speed multi-modal reasoning and structured schema generation.' },
    { category: 'Primary Storage', name: 'PostgreSQL 16 + pgvector', badge: 'ACID Relational', reasoning: 'Combines reliable transactional storage with vector similarity search.' },
    { category: 'Event Backbone', name: 'Apache Kafka', badge: 'Event-Driven', reasoning: 'Ensures reliable event delivery across distributed microservices.' },
  ];

  return {
    id: slug,
    title: systemName,
    description: `Production-ready distributed architecture, database schemas, APIs, AI multi-agent hierarchy, and cloud infrastructure generated for "${prompt}".`,
    category: 'Dynamic AI Generated Architecture',
    badge: 'AI Synthetic Generation • Production Grade',
    stats: {
      qps: '50,000 req/s',
      latency: '< 10ms p99',
      estimatedMonthlyCost: '$4,800 / mo',
      securityScore: '98/100 (Enterprise Standard)',
      nodeCount: nodes.length,
      agentCount: aiAgents.length,
    },
    nodes,
    edges,
    databaseSchema,
    apiEndpoints,
    aiAgents,
    cloudArchitecture,
    securityModel,
    userFlow,
    eventFlow,
    deploymentPlan,
    techStack,
  };
}
