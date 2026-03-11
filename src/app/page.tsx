import {
  FadeCarousel,
  CarouselSlide,
  TextOverlay,
  BackgroundImage,
} from "@/components/ui/fade-carousel";

export default function Home() {
  return (
    <main>
      <FadeCarousel autoplayInterval={10000}>
        <CarouselSlide>
          <BackgroundImage
            src="/images/page1-sunset-tree.jpg"
            alt="日落中的孤樹剪影"
            priority={true}
          />
          <TextOverlay
            mainTitle="佛陀的囑託<br/>兩千年的遙望"
            content="佛陀在<span class='whitespace-nowrap'>印度</span>的靈鷲山宣說妙法，<span class='whitespace-nowrap'>《大般涅槃經》</span>中提到信眾應朝禮四處<span class='whitespace-nowrap'>（生、<wbr>道、<wbr>轉、<wbr>滅）</span>的遺教。這個囑託開啟了信眾「朝山」的渴仰。這不只是一段路，而是一場跨越時空的歸鄉。"
            endQuote="「朝山，是為了與聖者對話。」"
          />
        </CarouselSlide>

        <CarouselSlide>
          <BackgroundImage
            src="/images/page2-buddha-relief.jpg"
            alt="佛教石雕浮雕"
          />
          <TextOverlay
            mainTitle="大唐盛世的步履"
            content="四大名山的慈悲迴響，<span class='whitespace-nowrap'>文殊</span>、<wbr><span class='whitespace-nowrap'>觀音</span>、<wbr><span class='whitespace-nowrap'>普賢</span>、<wbr><span class='whitespace-nowrap'>地藏</span>四大山頭的信仰，確立<span class='whitespace-nowrap'>「三步一拜」</span>磨練心志的修行傳統。當四大菩薩的願力化作<span class='whitespace-nowrap'>五台</span>、<wbr><span class='whitespace-nowrap'>普陀</span>、<wbr><span class='whitespace-nowrap'>峨眉</span>、<wbr><span class='whitespace-nowrap'>九華</span>的峰巒，朝山的足跡便在華夏大地刻下了謙卑的印記。"
            endQuote="「步步蓮花，禮拜四大菩薩」"
          />
        </CarouselSlide>

        <CarouselSlide>
          <BackgroundImage
            src="/images/page3-fisherman.jpg"
            alt="漁夫在海上日出"
          />
          <TextOverlay
            mainTitle="渡海"
            content="清領時期的移民<span class='whitespace-nowrap'>（早期台灣移民）</span>即便航程艱險，仍組團回<span class='whitespace-nowrap'>南海普陀山</span>朝聖，這是<span class='whitespace-nowrap'>台灣朝山文化</span>的血脈根基。縱使隔著汪洋，仍心繫普陀。那份對法門的堅持，<span class='whitespace-nowrap'>隨著海浪，在台灣的土地紮了根。</span>"
            endQuote="「心繫南海 步履寶島」"
          />
        </CarouselSlide>

        <CarouselSlide>
          <BackgroundImage
            src="/images/page4-monks-pilgrimage.jpg"
            alt="僧侶朝山修行"
          />
          <TextOverlay
            mainTitle="紮根"
            content="<span class='whitespace-nowrap'>台灣靈山</span>的確立。<wbr>四大法脈的宗風傳承，從月眉山到大崗山，<span class='whitespace-nowrap'>台灣佛教</span>在<span class='whitespace-nowrap'>日治時期</span>確立了在地法脈。<wbr><span class='whitespace-nowrap'>靈山處處，每一座山頭都是觀照自心的明鏡。</span>"
            endQuote="「地靈人傑，寶島自有的靈性座標」"
          />
        </CarouselSlide>

        <CarouselSlide>
          <BackgroundImage
            src="/images/page5-monk-meditation.jpg"
            alt="紅衣僧人在山崖冥想"
          />
          <TextOverlay
            mainTitle="靈鷲山海<br/>心和平的歸宿"
            content="而今日，我們在<span class='whitespace-nowrap'>太平洋</span>的起點，接續這份跨越兩千年的虔誠。<wbr>願將這份朝山精神轉化為<span class='whitespace-nowrap'>守護地球</span>的願力。"
            endQuote="「這一次，換你走入靈山。」"
          />
        </CarouselSlide>
      </FadeCarousel>
    </main>
  );
}
