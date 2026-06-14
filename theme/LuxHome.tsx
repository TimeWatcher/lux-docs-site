import { useState } from 'react';
import type { CSSProperties } from 'react';

type Locale = 'en' | 'zh';
type Tab = 'lux' | 'lua';
type TokenKind =
  | 'comment'
  | 'keyword'
  | 'realm'
  | 'string'
  | 'number'
  | 'type'
  | 'function'
  | 'literal'
  | 'operator';

type Token = {
  text: string;
  kind?: TokenKind;
};

type Copy = {
  kicker: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  tabs: Record<Tab, string>;
  visualLabel: string;
  pipeline: string[];
  statLabel: string;
  statValue: string;
  statNote: string;
  chips: string[];
  strips: Array<{
    title: string;
    body: string;
    link: string;
  }>;
};

const COPY: Record<Locale, Copy> = {
  en: {
    kicker: "Lux for Garry's Mod",
    title: 'Expressive Lux in. Ordinary GLua out.',
    subtitle:
      "Write match, arrows, expression returns, nil-safe access, directory modules, and realm-aware code. Lux compiles it into readable Lua 5.1 that Garry's Mod can load.",
    primary: 'Get Started',
    secondary: 'Explore Syntax',
    tabs: {
      lux: 'Lux',
      lua: 'Lua 5.1',
    },
    visualLabel: 'Code comparison',
    pipeline: ['source', 'realm split', 'loader', 'Lua 5.1'],
    statLabel: 'first-class',
    statValue: 'syntax',
    statNote: 'not loader glue',
    chips: [
      'match + enum',
      'arrow callbacks',
      'implicit returns',
      'server/client blocks',
    ],
    strips: [
      {
        title: 'Less GLua noise',
        body: 'Functions, callbacks, branching, nil handling, and table shaping stay compact without hiding Lua semantics.',
        link: 'language/functions-control',
      },
      {
        title: 'GMod rules in the language',
        body: 'Files, declarations, and realm blocks describe client/server/shared code before the loader is generated.',
        link: 'language/realms',
      },
      {
        title: 'Modules by directory',
        body: 'Part files share a private module scope. Public API is only what the module explicitly exports.',
        link: 'language/modules',
      },
      {
        title: 'Debuggable output',
        body: 'The compiler emits ordinary Lua 5.1, readable module factories, source maps, and bundled loaders.',
        link: 'reference/generated-lua',
      },
    ],
  },
  zh: {
    kicker: "面向 Garry's Mod 的 Lux",
    title: '写的是现代 Lux，交付的是普通 GLua。',
    subtitle:
      '用 match、箭头函数、表达式返回、空值安全访问、目录模块和运行域代码写插件；Lux 会编译成 GMod 能直接加载的可读 Lua 5.1。',
    primary: '快速开始',
    secondary: '查看语法',
    tabs: {
      lux: 'Lux',
      lua: 'Lua 5.1',
    },
    visualLabel: '代码对照',
    pipeline: ['源码', '运行域拆分', 'loader', 'Lua 5.1'],
    statLabel: '核心卖点',
    statValue: '表达力',
    statNote: '不是 loader 胶水',
    chips: ['match + enum', '箭头回调', '隐式返回', '运行域代码块'],
    strips: [
      {
        title: '少写 GLua 噪音',
        body: '函数、回调、分支、空值处理和表结构都更紧凑，但不会遮住 Lua 本身的语义。',
        link: 'language/functions-control',
      },
      {
        title: 'GMod 规则进入语言',
        body: '文件、声明和运行域代码块共同描述 client、server、shared，loader 由编译器生成。',
        link: 'language/realms',
      },
      {
        title: '目录就是模块',
        body: '多个 part 文件共享模块私有作用域；只有显式 export 的绑定才成为公开 API。',
        link: 'language/modules',
      },
      {
        title: '输出仍可调试',
        body: '编译器输出普通 Lua 5.1、可读模块工厂、源码映射和 bundle 私有 loader。',
        link: 'reference/generated-lua',
      },
    ],
  },
};

const LUX_CODE = `import { arr } from "@lux/std"
enum Badge repr number {
  Admin = 1,
  Alive = 2,
  Dead = 3,
}

fn badgeOf(ply) =
  ply?:IsAdmin() then Badge.Admin
  else ply?:Alive() then Badge.Alive
  else Badge.Dead

fn tint(badge) =
  match badge {
    Badge.Admin => Color(255, 214, 92)
    Badge.Alive => Color(84, 236, 166)
    _ => Color(170, 178, 190)
  }
client fn rows(players) =
  players
    |> arr.filter(%, (ply) => IsValid(ply))
    |> arr.map(%, (ply) => {
      local badge = badgeOf(ply)
      { name = ply?:Nick() ?? "unknown", color = tint(badge) }
    })

export client { scoreboardRows = rows }`;

const LUA_CODE = `local arr = __lux_import("@lux/std").arr

local function badgeOf(ply)
  if ply ~= nil and ply:IsAdmin() then return 1 end
  if ply ~= nil and ply:Alive() then return 2 end
  return 3
end

local function tint(badge)
  if badge == 1 then return Color(255, 214, 92) end
  if badge == 2 then return Color(84, 236, 166) end
  return Color(170, 178, 190)
end

local function rows(players)
  return arr.map(arr.filter(players, function(ply)
    return IsValid(ply)
  end), function(ply)
    local badge = badgeOf(ply)
    return { name = (ply ~= nil and ply:Nick()) or "unknown", color = tint(badge) }
  end)
end

__lux_exports.scoreboardRows = rows`;

const KEYWORDS = new Set([
  'and',
  'do',
  'else',
  'elseif',
  'end',
  'enum',
  'export',
  'fn',
  'for',
  'function',
  'if',
  'import',
  'in',
  'local',
  'match',
  'or',
  'return',
  'then',
]);

const REALMS = new Set(['client', 'server', 'shared']);
const LITERALS = new Set(['false', 'nil', 'true']);
const TYPES = new Set(['Badge', 'Color']);
const FUNCTIONS = new Set([
  'IsValid',
  'filter',
  'map',
  'badgeOf',
  'tint',
  'rows',
]);
const OPERATORS = ['=>', '??', '?:', '?.', '|>', '~=', '==', '>=', '<=', '='];

function highlightLine(line: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  const push = (text: string, kind?: TokenKind) => tokens.push({ text, kind });

  while (index < line.length) {
    const rest = line.slice(index);

    if (rest.startsWith('--')) {
      push(rest, 'comment');
      break;
    }

    const quote = line[index];
    if (quote === '"' || quote === "'") {
      let end = index + 1;
      while (end < line.length) {
        if (line[end] === '\\') {
          end += 2;
          continue;
        }
        if (line[end] === quote) {
          end += 1;
          break;
        }
        end += 1;
      }
      push(line.slice(index, end), 'string');
      index = end;
      continue;
    }

    const operator = OPERATORS.find((value) => rest.startsWith(value));
    if (operator) {
      push(operator, 'operator');
      index += operator.length;
      continue;
    }

    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number) {
      push(number[0], 'number');
      index += number[0].length;
      continue;
    }

    const word = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (word) {
      const value = word[0];
      const next = line.slice(index + value.length).trimStart()[0];
      const kind = REALMS.has(value)
        ? 'realm'
        : KEYWORDS.has(value)
          ? 'keyword'
          : LITERALS.has(value)
            ? 'literal'
            : TYPES.has(value)
              ? 'type'
              : FUNCTIONS.has(value) || next === '('
                ? 'function'
                : undefined;
      push(value, kind);
      index += value.length;
      continue;
    }

    push(line[index]);
    index += 1;
  }

  return tokens;
}

function CodeStage({ copy }: { copy: Copy }) {
  const [active, setActive] = useState<Tab>('lux');
  const code = active === 'lux' ? LUX_CODE : LUA_CODE;
  const lines = code.split('\n');

  return (
    <div className="lux-home-stage" aria-label={copy.visualLabel}>
      <div className="lux-home-stage__beam" aria-hidden="true" />
      <div className="lux-home-stage__toolbar">
        <div className="lux-home-stage__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className="lux-home-stage__tabs"
          role="tablist"
          aria-label={copy.visualLabel}
        >
          {(['lux', 'lua'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              className={active === tab ? 'is-active' : undefined}
              onClick={() => setActive(tab)}
            >
              {copy.tabs[tab]}
            </button>
          ))}
        </div>
      </div>

      <pre className="lux-home-code" data-active={active}>
        <code>
          {lines.map((line, lineIndex) => (
            <span
              className="lux-home-code__line"
              key={`${active}-${lineIndex}`}
            >
              {highlightLine(line).map((token, tokenIndex) => (
                <span
                  className={
                    token.kind
                      ? `lux-home-token lux-home-token--${token.kind}`
                      : undefined
                  }
                  key={tokenIndex}
                >
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>

      <div className="lux-home-stage__status" aria-hidden="true">
        <span>module/player_hud</span>
        <span>client export</span>
        <span>source map</span>
      </div>
    </div>
  );
}

export default function LuxHome({ locale = 'en' }: { locale?: Locale }) {
  const copy = COPY[locale] ?? COPY.en;

  return (
    <main className="lux-home">
      <section className="lux-home-hero">
        <div className="lux-home-copy">
          <p className="lux-home-kicker">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p className="lux-home-subtitle">{copy.subtitle}</p>
          <div className="lux-home-actions">
            <a
              className="lux-home-button lux-home-button--primary"
              href="guide/getting-started"
            >
              {copy.primary}
            </a>
            <a
              className="lux-home-button lux-home-button--secondary"
              href="language/functions-control"
            >
              {copy.secondary}
            </a>
          </div>
          <div className="lux-home-chip-row" aria-label={copy.statNote}>
            {copy.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>

        <div className="lux-home-visual">
          <div className="lux-home-pipeline" aria-hidden="true">
            {copy.pipeline.map((step, index) => (
              <span key={step} style={{ '--step': index } as CSSProperties}>
                {step}
              </span>
            ))}
          </div>
          <CodeStage copy={copy} />
          <div className="lux-home-meter" aria-hidden="true">
            <span>{copy.statLabel}</span>
            <strong>{copy.statValue}</strong>
            <small>{copy.statNote}</small>
          </div>
        </div>
      </section>

      <section className="lux-home-proof" aria-label="Lux features">
        {copy.strips.map((item) => (
          <a className="lux-home-proof__item" href={item.link} key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.body}</span>
          </a>
        ))}
      </section>
    </main>
  );
}
