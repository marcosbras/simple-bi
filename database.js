const Database = require('better-sqlite3');
const path = require('path');
const { randomUUID } = require('crypto');

const db = new Database(process.env.DB_PATH || path.join(__dirname, 'bi.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS empresas (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nome            TEXT    NOT NULL,
    api_base        TEXT    NOT NULL,
    login_endpoint  TEXT    NOT NULL DEFAULT '/usuario/login',
    ativo           INTEGER NOT NULL DEFAULT 1,
    criado_em       DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS relatorios (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    empresa_id  INTEGER NOT NULL,
    nome        TEXT    NOT NULL,
    endpoint    TEXT    NOT NULL,
    ativo       INTEGER NOT NULL DEFAULT 1,
    criado_em   DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS admin_config (
    id          INTEGER PRIMARY KEY CHECK (id = 1),
    usuario     TEXT NOT NULL DEFAULT 'admin',
    senha_hash  TEXT NOT NULL
  );
`);

// migração: adiciona coluna usuario se não existir
try {
  db.exec("ALTER TABLE admin_config ADD COLUMN usuario TEXT NOT NULL DEFAULT 'admin'");
} catch (_) { /* coluna já existe */ }

// migração: adiciona coluna tipo em relatorios
try {
  db.exec("ALTER TABLE relatorios ADD COLUMN tipo TEXT NOT NULL DEFAULT 'vendas'");
} catch (_) { /* coluna já existe */ }

// migração: adiciona coluna campo_exibicao em relatorios
try {
  db.exec("ALTER TABLE relatorios ADD COLUMN campo_exibicao TEXT NOT NULL DEFAULT 'campo1'");
} catch (_) { /* coluna já existe */ }

// migração: adiciona coluna uuid em empresas — identificador opaco usado em
// /api/erp/:uuid/* no lugar do id sequencial, para não expor/permitir
// enumerar empresas pela URL do proxy.
try {
  db.exec('ALTER TABLE empresas ADD COLUMN uuid TEXT');
} catch (_) { /* coluna já existe */ }

// credenciais padrão: admin / admin  →  sha256("admin")
const adminExists = db.prepare('SELECT COUNT(*) AS n FROM admin_config').get();
if (adminExists.n === 0) {
  db.prepare('INSERT INTO admin_config (id, usuario, senha_hash) VALUES (1, ?, ?)').run(
    'admin',
    '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
  );
}

// seed: empresa SGB (exemplo inicial)
const empCount = db.prepare('SELECT COUNT(*) AS n FROM empresas').get();
if (empCount.n === 0) {
  
  
  //IGA Gestão Inteligente
  var  r = db.prepare(
    'INSERT INTO empresas (nome, api_base, login_endpoint) VALUES (?, ?, ?)'
  ).run('CayemeColchões#01', 'https://dbgateway.igagestaointeligente.com.br/sgbrbi', '/usuario/login');

  db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint) VALUES (?, ?, ?)'
  ).run(r.lastInsertRowid, 'Vendas Sintético', '/vendas/analitico');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Produção', '/produzido', 'producao');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Compras', '/compras', 'compras');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Receber', '/contas/areceber', 'receber');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Pagar', '/contas/apagar', 'pagar');


 var r = db.prepare(
    'INSERT INTO empresas (nome, api_base, login_endpoint) VALUES (?, ?, ?)'
  ).run('PortoCais#01', 'https://dbgateway.igagestaointeligente.com.br/sgbrbi', '/usuario/login');

  db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint) VALUES (?, ?, ?)'
  ).run(r.lastInsertRowid, 'Vendas Sintético', '/vendas/analitico');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Produção', '/produzido', 'producao');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Compras', '/compras', 'compras');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Receber', '/contas/areceber', 'receber');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Pagar', '/contas/apagar', 'pagar');


 var r = db.prepare(
    'INSERT INTO empresas (nome, api_base, login_endpoint) VALUES (?, ?, ?)'
  ).run('ClaudioPescados#01', 'https://dbgateway.igagestaointeligente.com.br/sgbrbi', '/usuario/login');

  db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint) VALUES (?, ?, ?)'
  ).run(r.lastInsertRowid, 'Vendas Sintético', '/vendas/analitico');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Produção', '/produzido', 'producao');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Compras', '/compras', 'compras');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Receber', '/contas/areceber', 'receber');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Pagar', '/contas/apagar', 'pagar');


  //Central do Aplicativo
  var r = db.prepare(
    'INSERT INTO empresas (nome, api_base, login_endpoint) VALUES (?, ?, ?)'
  ).run('CayemeColchões#02', 'https://dbgateway.centraldoaplicativo.com.br/sgbrbi', '/usuario/login');

  db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint) VALUES (?, ?, ?)'
  ).run(r.lastInsertRowid, 'Vendas Sintético', '/vendas/analitico');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Produção', '/produzido', 'producao');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Compras', '/compras', 'compras');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Receber', '/contas/areceber', 'receber');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Pagar', '/contas/apagar', 'pagar');


  var r = db.prepare(
    'INSERT INTO empresas (nome, api_base, login_endpoint) VALUES (?, ?, ?)'
  ).run('Itacar#01', 'https://dbgateway.centraldoaplicativo.com.br/sgbrbi', '/usuario/login');

  db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint) VALUES (?, ?, ?)'
  ).run(r.lastInsertRowid, 'Vendas Sintético', '/vendas/analitico');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Produção', '/produzido', 'producao');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Compras', '/compras', 'compras');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Receber', '/contas/areceber', 'receber');

  db.prepare('INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  ).run(r.lastInsertRowid, 'Contas a Pagar', '/contas/apagar', 'pagar');

}

// migração: preenche uuid para empresas que ainda não têm (coluna nova ou seed acima)
const semUuid = db.prepare('SELECT id FROM empresas WHERE uuid IS NULL').all();
const setUuid = db.prepare('UPDATE empresas SET uuid = ? WHERE id = ?');
semUuid.forEach(e => setUuid.run(randomUUID(), e.id));

// migração: seed de relatórios novos (Venda Detalhada, Contas a Receber, Contas a
// Pagar, Venda à Vista, Financeiro Consolidado) para cada empresa já cadastrada
// que ainda não os tenha — roda a cada start do servidor, então uma empresa
// criada antes desses tipos existirem passa a ter as linhas automaticamente no
// próximo rebuild/restart, sem precisar configurar manualmente pelo admin.
try {
  const relatoriosPadrao = [
    { tipo: 'vendadet',    nome: 'Venda Detalhada',        endpoint: '/vendas/analitico' },
    { tipo: 'receber',     nome: 'Contas a Receber',        endpoint: '/contas/areceber' },
    { tipo: 'pagar',       nome: 'Contas a Pagar',          endpoint: '/contas/apagar' },
    { tipo: 'vendaavista', nome: 'Venda à Vista',           endpoint: '/vendas/analitico/avista' },
    { tipo: 'financeiro',  nome: 'Financeiro Consolidado',  endpoint: '/financeiro/consolidado' },
  ];
  const empresas = db.prepare('SELECT id FROM empresas WHERE ativo = 1').all();
  const insStmt  = db.prepare(
    'INSERT INTO relatorios (empresa_id, nome, endpoint, tipo) VALUES (?, ?, ?, ?)'
  );
  const existeStmt = db.prepare(
    'SELECT COUNT(*) AS n FROM relatorios WHERE empresa_id = ? AND tipo = ?'
  );
  empresas.forEach(e => {
    relatoriosPadrao.forEach(rp => {
      if (existeStmt.get(e.id, rp.tipo).n === 0) {
        insStmt.run(e.id, rp.nome, rp.endpoint, rp.tipo);
      }
    });
  });
} catch (_) {}

module.exports = db;
