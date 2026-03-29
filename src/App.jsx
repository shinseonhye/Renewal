import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'

const gnbTabs = ['디자인', '편의사양', '퍼포먼스', '안전사양', '내 차 만들기', '액세서리', '스펙']

const TAB_SECTION_MAP = {
  '디자인': null,        // 맨 위
  '편의사양': 'convenience',
  '퍼포먼스': 'performance',
  '안전사양': 'safety',
  '내 차 만들기': 'build',
  '액세서리': 'accessories',
  '스펙': null,
}

const modelTabs = [
  { id: 'vip', label: 'LX 700h VIP' },
  { id: 'luxury', label: 'LX 700h LUXURY' },
  { id: 'overtrail', label: 'LX 700h OVERTRAIL' },
]

const configSteps = ['등급', '익스테리어', '인테리어', '액세서리', '금융 프로그램', '오너혜택', '견적 완료']

const accessories = [
  { name: 'LX 전용 카고매트 세트', price: 'KRW 143,000', vat: 'VAT 포함, 공임 별도' },
  { name: 'LX 전용 올시즌 플로어매트', price: 'KRW 792,000', vat: 'VAT 포함, 공임 별도' },
  { name: 'LX 전용 도어엣지가드 세트', price: 'KRW 880,000', vat: 'VAT 포함, 공임 별도' },
  { name: 'LX 전용 트렁크 트레이', price: 'KRW 330,000', vat: 'VAT 포함, 공임 별도' },
]

function ImgBox({ className, style, children }) {
  return (
    <div className={`img-placeholder ${className || ''}`} style={style}>
      {children}
    </div>
  )
}

function SpecBar({ compact }) {
  return (
    <div className={`spec-bar${compact ? ' config-spec-bar' : ''}`}>
      <div className="spec-item">
        <span className="spec-label">배기량</span>
        <span className="spec-value" style={{ fontSize: compact ? 14 : undefined }}>3,445cc</span>
      </div>
      <div className="spec-divider" />
      <div className="spec-item">
        <span className="spec-label">시스템 총 출력</span>
        <span className="spec-value" style={{ fontSize: compact ? 14 : undefined }}>464ps</span>
      </div>
      <div className="spec-divider" />
      <div className="spec-item">
        <span className="spec-label">연비 (복합)</span>
        <span className="spec-value" style={{ fontSize: compact ? 14 : undefined }}>8.0km/l(5등급)</span>
      </div>
    </div>
  )
}

export default function App() {
  const [activeGnbTab, setActiveGnbTab] = useState('디자인')
  const [activeModel, setActiveModel] = useState('vip')
  const [activeConfigStep, setActiveConfigStep] = useState('등급')
  const gnbRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(scrolled / total, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = useCallback((tab) => {
    setActiveGnbTab(tab)
    const sectionId = TAB_SECTION_MAP[tab]
    const gnbHeight = gnbRef.current?.offsetHeight ?? 0

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - gnbHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* ── GNB ─────────────────────────── */}
      <nav className="gnb" ref={gnbRef}>
        <div className="gnb-top">
          <span className="gnb-model">LX 700h VIP</span>
          <div className="gnb-actions">
            <button className="btn-outline">시승신청</button>
            <button className="btn-outline">상담신청</button>
          </div>
        </div>
        <div className="gnb-progress">
          <div className="gnb-progress-bar" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="gnb-tabs">
          {gnbTabs.map((tab) => (
            <button
              key={tab}
              className={`gnb-tab${activeGnbTab === tab ? ' active' : ''}`}
              onClick={() => scrollToSection(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* ── HERO ────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg">
          <span className="hero-lx-text">LX</span>
          <ImgBox className="hero-car-img">차량 이미지</ImgBox>
        </div>

        <div className="hero-info">
          <div className="hero-price-block">
            <span className="hero-hev-badge">HEV</span>
            <div className="hero-price">
              <span className="hero-price-label">KRW</span>
              <span className="hero-price-value">194,670,000</span>
              <span className="hero-price-unit">원</span>
            </div>
          </div>
          <button className="btn-primary">시승신청</button>
        </div>

        <div className="model-tabs">
          {modelTabs.map((m) => (
            <button
              key={m.id}
              className={`model-tab${activeModel === m.id ? ' active' : ''}`}
              onClick={() => setActiveModel(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── DESIGN EXTERIOR ─────────────── */}
      <section className="section" id="design">
        <div className="section-header">
          <div>
            <p className="section-label">DESIGN-EXTERIOR</p>
            <h2 className="section-heading">플래그십 SUV의 품격 있는 세련미</h2>
          </div>
          <p className="section-desc">
            스핀들 그릴 디자인을 적용하여 LX 700h만의 강렬한 존재감을 완성했습니다.
            7개의 플로팅 바로 입체적인 형상을 구현하고, 프레임 리스를 통해 LX 700h만의 세련미를 더했습니다.
          </p>
        </div>

        <SpecBar />

        <ImgBox className="design-ext-wide">메인 익스테리어 이미지</ImgBox>

        <div className="design-ext-grid">
          <ImgBox className="design-ext-sub">차량 측면 이미지</ImgBox>
          <div>
            <ImgBox className="design-ext-sub-right">스핀들 그릴 클로즈업</ImgBox>
            <p className="design-ext-text" style={{ marginTop: 16 }}>
              LX 700h의 익스테리어 디자인 테마는 Dignified Sophistication으로
              진정한 오프로더로서 최고의 다이내믹 성능을 계승한 모델임을 디자인으로 표현했습니다.
            </p>
            <button className="btn-more">더보기</button>
          </div>
        </div>

        <ImgBox className="design-ext-wide2">익스테리어 와이드 이미지</ImgBox>
      </section>

      {/* ── DESIGN INTERIOR ─────────────── */}
      <section className="section section-alt" id="interior">
        <div className="section-header">
          <div>
            <p className="section-label">DESIGN-INTERIOR</p>
            <h2 className="section-heading">VIP의 품격을 담은 공간</h2>
          </div>
          <p className="section-desc">
            어떤 환경에서도 최상의 만족감을 선사하는 LX 700h는 단순한 이동수단을 넘어,
            럭셔리 라이프스타일을 완성하는 특별한 경험을 제공합니다.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <button className="btn-more">더보기</button>
        </div>

        <div className="design-int-images">
          <ImgBox className="design-int-img-left">인테리어 이미지</ImgBox>
          <ImgBox className="design-int-img-right" style={{ height: 335 }}>인테리어 상세 이미지</ImgBox>
        </div>

        <p className="section-desc" style={{ marginTop: 24, maxWidth: 400 }}>
          LX의 인테리어는 직선적인 수평 디자인을 유지해 거친 도로에서도 쉽게 균형감을 유지할 수 있습니다.
          TAZUNA 컨셉을 적용해 거친 도로 환경에서도 운전에 집중할 수 있는 편안한 공간을 추구합니다.
        </p>
        <button className="btn-more">더보기</button>
      </section>

      {/* ── CONVENIENCE ─────────────────── */}
      <section className="section" id="convenience">
        <div className="section-header">
          <div>
            <p className="section-label">CONVENIENCE</p>
            <h2 className="section-heading">플래그십 SUV로서<br />니즈를 충족하는 편의사양</h2>
          </div>
          <p className="section-desc">
            어떤 환경에서도 최상의 만족감을 선사하는 LX 700h는 단순한 이동수단을 넘어,
            럭셔리 라이프스타일을 완성하는 특별한 경험을 제공합니다.
          </p>
        </div>

        <div className="convenience-band">편의사양 이미지</div>

        <div className="convenience-footer">
          <button className="btn-more btn-more-lg">더보기</button>
        </div>
      </section>

      {/* ── PERFORMANCE ─────────────────── */}
      <section className="section section-alt" id="performance">
        <div className="section-header">
          <div>
            <p className="section-label">PERFORMANCE</p>
            <h2 className="section-heading">일상과 어드벤처를<br />아우르는 주행 성능</h2>
          </div>
          <p className="section-desc">
            LX의 오프로드 주행성능은 4세대에 걸쳐 쌓아온 데이터와 다양한 주행보조 기능을 통해
            안정적이고 뛰어난 험로 주파 능력을 경험할 수 있습니다.
          </p>
        </div>

        <div className="perf-layout">
          <div>
            <ImgBox className="perf-img">퍼포먼스 이미지 1</ImgBox>
            <p className="section-desc" style={{ marginTop: 16 }}>
              LX 700h의 하이브리드 시스템은 최상의 연비 효율과 함께
              강력한 출력을 동시에 제공합니다.
            </p>
          </div>
          <div>
            <ImgBox className="perf-img">퍼포먼스 이미지 2</ImgBox>
            <p className="section-desc" style={{ marginTop: 16 }}>
              다양한 노면 상황에 맞춰 자동으로 조절되는 어댑티브 서스펜션 시스템으로
              최적의 승차감을 경험하세요.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
          <button className="btn-more btn-more-lg">더보기</button>
        </div>
      </section>

      {/* ── SAFETY ──────────────────────── */}
      <section className="section" id="safety">
        <div className="section-header">
          <div>
            <p className="section-label">SAFETY</p>
            <h2 className="section-heading">LSS+로 강화된<br />안전사양</h2>
          </div>
          <p className="section-desc">
            LSS+는 PCS, DRCC, LTA, RSA, PDA, AHS 총 6가지의 능동적 안전 사양으로 구성되어 있습니다.
            차량의 전방에 탑재된 밀리미터 웨이브 레이더와 카메라는 뛰어난 감지 기술로 LSS+를 뒷받침합니다.
          </p>
        </div>

        <div className="safety-cards">
          <div className="safety-card">
            <ImgBox className="safety-card-img" />
            <div className="safety-card-body">
              <p className="safety-card-title">LEXUS SAFETY SYSTEM+</p>
              <p className="safety-card-desc">
                LSS+는 PCS, DRCC, LTA, RSA, PDA, AHS 총 6가지의 능동적 안전 사양으로
                구성되어 있습니다. 차량의 전방에 탑재된 밀리미터 웨이브 레이더와 카메라는
                뛰어난 감지 기술로 LSS+를 뒷받침합니다.
              </p>
            </div>
          </div>
          <div className="safety-card">
            <ImgBox className="safety-card-img" />
            <div className="safety-card-body">
              <p className="safety-card-title">저속 가속 제한</p>
              <p className="safety-card-desc">
                밀리미터 웨이브 레이더 및 카메라가 저속 차량의 바로 앞에 있는 보행자, 자전거 혹은
                차량을 감지합니다. 충돌이 회피 되거나 차량이 정지한 경우, 운전자가 가속 페달
                혹은 브레이크 조작을 할 때까지 제동력이 유지됩니다.
              </p>
            </div>
          </div>
          <div className="safety-card">
            <div className="safety-card-img" style={{ background: '#3a3a3a' }} />
            <div className="safety-card-body">
              <p className="safety-card-title">다이내믹 레이더 크루즈 컨트롤(DRCC)</p>
              <p className="safety-card-desc">
                DRCC는 차량의 전방에 장착된 밀리미터 웨이브 레이더를 통해 선행 차량의 속도를 감지하고
                이에 맞는 주행 속도를 자동으로 유지합니다. 전방 주행 차량의 정차 시에는
                적당한 차간 거리를 유지하면서 함께 정지합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAR CONFIGURATOR ────────────── */}
      <section className="config-section" id="build">
        <div className="config-nav">
          <div className="config-model-badge">
            <span className="config-hev">HEV</span>
            <span className="config-model-name">LX 700h VIP</span>
          </div>
          <div className="config-steps">
            {configSteps.map((step) => (
              <button
                key={step}
                className={`config-step${activeConfigStep === step ? ' active' : ''}`}
                onClick={() => setActiveConfigStep(step)}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        <div className="config-body">
          <div className="config-panel">
            <p className="config-section-title">나만의 LX 700h VIP 만들기</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>등급</p>

            <div className="config-grade-box">
              <div className="config-grade-indicator" />
              <p className="config-grade-name">VIP</p>
              <p className="config-grade-desc">4인승/2열 전동시트 (마사지 기능)</p>
              <p className="config-grade-price">194,670,000원</p>
            </div>

            <div className="config-price-summary">
              <p className="config-price-label">예상 가격</p>
              <p className="config-price-big">
                194,670,000 <span className="config-price-unit">원</span>
              </p>
              <div className="config-btn-row">
                <button className="btn-config-cta">시승신청</button>
                <span className="config-summary-link">견적 요약</span>
              </div>
            </div>
          </div>

          <div>
            <ImgBox className="config-car-view">차량 구성 이미지</ImgBox>
            <SpecBar compact />
            <p className="config-note">
              * 등급 별로 익스테리어/인테리어가 상이할 수 있습니다.<br />
              * 디자인, 색상, 특징, 액세서리 등의 이미지는 이해를 돕기 위한 참고용이며, 실제 제품과는 다를 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── ACCESSORIES ─────────────────── */}
      <section className="section" id="accessories">
        <p className="section-label">ACCESSORIES</p>
        <h2 className="section-heading" style={{ marginBottom: 8 }}>
          LX 전용 액세서리를 통해 나만의 이동공간을 완성해 보세요.
        </h2>

        <div className="acc-cards">
          {accessories.map((acc, i) => (
            <div className="acc-card" key={i}>
              <div className="acc-card-img">
                <ImgBox style={{ height: '100%' }}>
                  <span className="acc-card-more">자세히 보기</span>
                </ImgBox>
              </div>
              <div className="acc-card-body">
                <p className="acc-card-name">{acc.name}</p>
                <p className="acc-card-price">{acc.price}</p>
                <p className="acc-card-vat">{acc.vat}</p>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Package */}
        <p className="section-label" style={{ marginTop: 60 }}>LX 700h VIP PACKAGE</p>
        <div className="vip-package">
          <div className="vip-package-row">
            <ImgBox className="vip-package-img" />
            <div className="vip-package-info">
              <p className="vip-package-label">LX 전용 VIP 패키지</p>
              <p className="vip-package-name">VIP 럭셔리 인테리어 패키지</p>
            </div>
            <div className="vip-package-prices">
              <p className="vip-package-original">
                KRW 2,365,000 <span>원</span>
              </p>
              <p className="vip-package-sale">
                KRW 1,914,000 <span>원</span>
              </p>
              <p className="vip-package-vat">VAT 포함, 공임 별도</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="footer">
        <p className="footer-logo">RENEWAL</p>
        <div className="footer-links">
          {['개인정보처리방침', '이용약관', '고객센터', '딜러 찾기', '시승 신청', '견적 상담'].map((link) => (
            <a key={link} href="#" className="footer-link">{link}</a>
          ))}
        </div>
        <p className="footer-copy">
          © 2024 Lexus Korea. All rights reserved.
        </p>
      </footer>
    </>
  )
}
