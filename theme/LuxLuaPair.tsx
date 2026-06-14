import { Children, type ReactNode, useEffect, useState } from 'react';

type LuxLuaPairProps = {
  children: ReactNode;
  title?: string;
  luxLabel?: string;
  luaLabel?: string;
  groupId?: string;
};

export default function LuxLuaPair({
  children,
  title,
  luxLabel = 'Lux 源码',
  luaLabel = '编译后 Lua',
  groupId = 'lux-lua-pair',
}: LuxLuaPairProps) {
  const storageKey = `lux.docs.codePair.${groupId}`;
  const [active, setActive] = useState<'lux' | 'lua'>('lux');
  const ariaLabel = /[\u4e00-\u9fff]/.test(`${luxLabel}${luaLabel}`)
    ? '代码对照切换'
    : 'Code comparison switch';
  const blocks = Children.toArray(children).filter(
    child => !(typeof child === 'string' && child.trim() === ''),
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'lux' || saved === 'lua') {
      setActive(saved);
    }
  }, [storageKey]);

  const select = (value: 'lux' | 'lua') => {
    setActive(value);
    window.localStorage.setItem(storageKey, value);
  };

  if (blocks.length < 2) {
    return (
      <div className="lux-lua-pair lux-lua-pair--invalid">
        {title ? <div className="lux-lua-pair__title">{title}</div> : null}
        {children}
      </div>
    );
  }

  return (
    <section className="lux-lua-pair">
      {title ? <div className="lux-lua-pair__title">{title}</div> : null}
      <div className="lux-lua-pair__switch" role="tablist" aria-label={ariaLabel}>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'lux'}
          className={active === 'lux' ? 'is-active' : undefined}
          onClick={() => select('lux')}
        >
          {luxLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === 'lua'}
          className={active === 'lua' ? 'is-active' : undefined}
          onClick={() => select('lua')}
        >
          {luaLabel}
        </button>
      </div>
      <div className="lux-lua-pair__panel" role="tabpanel">
        {active === 'lux' ? blocks[0] : blocks[1]}
      </div>
    </section>
  );
}
