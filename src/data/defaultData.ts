import type { CardContent, CardImages } from '../types';

export const MOM_PHOTOS: string[] = Array.from(
  { length: 25 },
  (_, i) => `/images/mom/mom-${i + 1}.jpg`
);

export const DEFAULT_IMAGES: CardImages = {
  garland: '/images/lovegift-candle/decor/garland-bunting-01.webp',
  cake: '/images/lovegift-candle/props/cake-new.webp',
  wishTag: '/images/lovegift-candle/decor/wish-tag-01.webp',
  heartConfetti: '/images/proposal-certificate/particles/heart-petal-confetti-01.webp',
  sparkle: '/images/proposal-certificate/particles/sparkle-confetti-01.webp',
  paper: '/images/proposal-certificate/paper/paper-letter-tall-01.webp',
  letterPhoto: '/images/mom/mom-1.jpg',
  girls: MOM_PHOTOS,
  petals: [
    '/images/secret-bouquet/intro/petal-cream-broad-01.webp',
    '/images/secret-bouquet/intro/petal-cream-long-01.webp',
    '/images/secret-bouquet/intro/petal-blush-broad-01.webp',
    '/images/secret-bouquet/intro/petal-peach-broad-01.webp',
    '/images/secret-bouquet/intro/petal-peach-long-01.webp',
    '/images/secret-bouquet/intro/petal-peach-long-02.webp',
    '/images/secret-bouquet/intro/petal-cream-heart-01.webp',
  ],
};

export const LOCALES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const CONTENTS: Record<string, CardContent> = {
  vi: {
    senderName: 'Con',
    receiverName: 'Mẹ yêu',
    opening: {
      greeting: 'Happy Birthday Mẹ',
      day: 17,
      month: 7,
    },
    intro: {
      line1: 'Có một món quà đặc biệt dành riêng cho Mẹ…',
      line2: 'Nhưng trước khi mở quà, Mẹ hãy thổi nến trước nhé 🎂',
      idleHint: '👆 Nhấn & giữ ngọn nến cho đến khi tắt',
      holdingHint: 'giữ nữa… giữ tiếp… ước một điều ước nhé…',
      lightingHint: 'đang thắp nến cho Mẹ…',
    },
    beats: [
      'Ngọn nến đã tắt…',
      'Cả cuộc đời Mẹ đã hy sinh và vất vả vì chúng con quá nhiều.',
      'Từ hôm nay, Mẹ chỉ cần bình an và thật vui vẻ thôi nhé. Con luôn ở bên Mẹ mà ❤️',
    ],
    blackoutCaption: 'đang gom góp những kỷ niệm ấm áp nhất về Mẹ…',
    wish: {
      kicker: 'Một điều ước',
      question: 'Bây giờ… Mẹ hãy chọn một điều ước cho ngày sinh nhật của mình nhé.',
      options: [
        'Sức khỏe dồi dào, sống lâu',
        'Mỗi ngày đều an vui hạnh phúc',
        'Bớt lo toan, sống thảnh thơi',
        'Gia đình luôn sum vầy ấm êm',
      ],
      reply: 'Điều ước của Mẹ đã được gửi tới vũ trụ. Mong nó từ từ thành hiện thực.',
    },
    heart: {
      caption: 'Tất cả những khoảnh khắc yêu thương này là dành riêng cho Mẹ.',
      title: 'Chúc Mừng Sinh Nhật Mẹ Yêu.',
      subtitle: 'Hôm nay Mẹ nhất định phải là người phụ nữ hạnh phúc nhất trần đời.',
      next: 'Có một lá thư con viết riêng cho Mẹ →',
    },
    letter: {
      kicker: 'Lá thư gửi Mẹ',
      body: `Mẹ kính yêu,\n\nCon không giỏi nói những lời ngọt ngào hoa mỹ, nên con mượn tấm thiệp nhỏ này để gửi gắm lòng mình: Chúc mừng sinh nhật Mẹ!\n\nCả cuộc đời Mẹ đã vì gia đình, vì chúng con mà vất vả, hy sinh quá nhiều. Có những nhọc nhằn Mẹ chưa từng kể, có những âu lo Mẹ lặng lẽ giấu vào trong. Càng lớn lên, con càng thấu hiểu những giọt mồ hôi và tình thương bao la mà Mẹ đã dành cho con.\n\nBước sang tuổi mới, con chỉ mong Mẹ luôn dồi dào sức khỏe, ăn ngon ngủ ngon, mỗi ngày trôi qua đều nhẹ nhõm, an vui và không còn muộn phiền lo nghĩ.\n\nCảm ơn Mẹ vì đã là Mẹ của con. Con yêu Mẹ rất nhiều!`,
      signature: '— Con yêu của Mẹ',
      next: 'Vẫn còn một điều kỳ diệu nữa →',
    },
    final: {
      kicker: 'Dành trọn cho Mẹ',
      title: 'Chúc Mừng Sinh Nhật Mẹ',
      from: 'từ Con yêu',
      message:
        'Mong điều ước Mẹ chọn lúc nãy thật sự tìm được đường đến với Mẹ trong năm nay. Cảm ơn Mẹ vì tất cả!',
      starButton: 'Gửi điều ước lên trời',
      repeatButton: 'Bắt đầu lại từ đầu',
    },
    starlight: {
      kicker: 'Gửi lên trời cao',
      title: 'Biến điều ước thành sao băng',
      subtitle: 'Chạm vào ngôi sao để gửi điều ước của Mẹ lên bầu trời đêm lung linh.',
      wishFallback: 'Điều ước của Mẹ',
      sentTitle: 'Điều ước đã được gửi đi',
      sentMessage:
        'Người ta nói điều ước gửi theo sao băng sớm muộn cũng thành hiện thực. Từ đêm nay, sẽ luôn có một ngôi sao sáng nhất giữ lời ước ấy giúp Mẹ.',
      tapHint: 'Chạm vào bầu trời để thả thêm sao băng nhé ✧',
      backButton: 'Quay lại thiệp',
      repeatButton: 'Bắt đầu lại từ đầu',
    },
    ui: {
      months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      monthLabel: '{monthName}',
      heartTapHint: 'Chạm vào trái tim để xem các bức ảnh kỷ niệm ♡',
      viewPhoto: 'Xem ảnh',
      tapToClose: 'Chạm bất kỳ đâu để đóng',
      languageLabel: 'Ngôn ngữ',
      musicOn: 'Bật nhạc',
      musicOff: 'Tắt nhạc',
      customizeTitle: 'Tùy Chỉnh Thiệp Sinh Nhật',
      customizeBtn: 'Tùy chỉnh',
    },
  },
  en: {
    senderName: 'Your Child',
    receiverName: 'Dear Mom',
    opening: {
      greeting: 'Happy Birthday Mom',
      day: 17,
      month: 7,
    },
    intro: {
      line1: 'There is a special little gift here for Mom…',
      line2: 'But before you open it, blow out the candle first',
      idleHint: '👆 Press & hold the flame until it goes out',
      holdingHint: 'keep holding… almost there… make a wish…',
      lightingHint: 'lighting the candle for Mom…',
    },
    beats: [
      'The candle has gone out…',
      "You have worked so hard and sacrificed so much for our family.",
      "From now on, please just be happy, peaceful and relaxed. I love you, Mom",
    ],
    blackoutCaption: 'gathering up our sweetest memories of Mom…',
    wish: {
      kicker: 'One wish',
      question: 'Now… pick one birthday wish just for yourself, Mom.',
      options: [
        'Great health & long life',
        'Every day filled with joy',
        'Less worries, peaceful days',
        'A warm and cozy family',
      ],
      reply: 'Your wish has been received by the universe. May it gently come true.',
    },
    heart: {
      caption: 'All these cherished moments are for you, Mom.',
      title: 'Happy Birthday, Mom.',
      subtitle: 'Today, you deserve to be the happiest woman in the world.',
      next: "There's a letter written for you →",
    },
    letter: {
      kicker: 'A Letter for Mom',
      body: `Dearest Mom,\n\nI may not be good at poetic words, so I put my heart into this little note: Happy Birthday, Mom!\n\nAll your life, you have sacrificed tirelessly for our family and for us. There were hardships you never spoke of, and worries you silently carried. The older I grow, the more I appreciate your boundless love and care.\n\nOn this new birthday, I only wish for you to be full of good health, sleep peacefully, and find joy in every single day without worry.\n\nThank you for being the most wonderful mother. I love you so much!`,
      signature: '— With all my love',
      next: "There's still more magic →",
    },
    final: {
      kicker: 'Dedicated to Mom',
      title: 'Happy Birthday, Mom',
      from: 'from your child',
      message:
        'May the wish you picked earlier truly find its way to you this year. Thank you for everything!',
      starButton: 'Send wish to the stars',
      repeatButton: 'Start over from beginning',
    },
    starlight: {
      kicker: 'Up to the night sky',
      title: 'Turn wish into a shooting star',
      subtitle: 'Touch the glowing star to release your wish into the night sky.',
      wishFallback: "Mom's wish",
      sentTitle: 'The wish has taken flight',
      sentMessage:
        'They say a wish riding on a shooting star will always come true. Starting tonight, the brightest star in the sky will keep that wish safe for you.',
      tapHint: 'Tap anywhere in the sky to launch more shooting stars ✧',
      backButton: 'Back to card',
      repeatButton: 'Start over from beginning',
    },
    ui: {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthLabel: '{monthName}',
      heartTapHint: 'Touch the heart mosaic to view photos ♡',
      viewPhoto: 'View photo',
      tapToClose: 'Tap anywhere to close',
      languageLabel: 'Language',
      musicOn: 'Play Music',
      musicOff: 'Mute Music',
      customizeTitle: 'Customize Birthday Card',
      customizeBtn: 'Customize',
    },
  },
};

export function parseQueryParams(): Partial<CardContent> & { customImages?: string[] } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: any = {};

  const senderName = params.get('senderName');
  const receiverName = params.get('receiverName');
  const dayStr = params.get('day');
  const monthStr = params.get('month');
  const dob = params.get('dob') || params.get('birthday');
  const letterBody = params.get('letter');
  const birthdayWish = params.get('wish');

  if (senderName) result.senderName = senderName;
  if (receiverName) result.receiverName = receiverName;

  let d = dayStr ? parseInt(dayStr, 10) : undefined;
  let m = monthStr ? parseInt(monthStr, 10) : undefined;

  if (dob) {
    const parts = dob.split(/[-/.]/);
    if (parts.length >= 3) {
      // YYYY-MM-DD or DD-MM-YYYY
      if (parts[0].length === 4) {
        m = parseInt(parts[1], 10);
        d = parseInt(parts[2], 10);
      } else {
        d = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
      }
    } else if (parts.length === 2) {
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
    }
  }

  if (d && m && !isNaN(d) && !isNaN(m)) {
    result.opening = { day: d, month: m };
  }

  if (letterBody) {
    result.letter = { body: letterBody };
  }

  if (birthdayWish) {
    result.heart = { title: birthdayWish };
    result.final = { title: birthdayWish };
  }

  const imgs = params.get('images');
  if (imgs) {
    result.customImages = imgs.split(',').map((s) => s.trim());
  }

  return result;
}
