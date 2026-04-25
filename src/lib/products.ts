import type { Collection, Product } from "./types";

const catalogImages = {
  malachitePendant:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCL0r2ogzOPqNBcozXbG8qXWI5Jn3H8v5BoA_Jjffcy_rX3UCkhhgtvXc40rZeM3ZRcMJo_5OJaNygKXYXoAbN4FvX25pxjOFJ2zJ4TSp2QcLNCKPwRkvhW-zid7T5SxrlIum5NOb2GlwiYH5Tj2_7GWrH_fIkeHmaI2gAScc5DWuQme-ByQebC2ldWcMgMK4w0f07EA7kxClHBuYEltvlUWbBnHzANX_Oyjxez9Im_otI4ouI177t7y40WhVUrIXrosQiX8YKhyvk",
  pearlNecklace:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBT_blSVRNz8Gg5Trg0GB3-TrHNPrYJvOk6GEUwqOQXlXwYenBLkjjCnYn8DCgb5xb2NRLHtEJU0km1VVVz8Gwj9fnN_dgQ3pVnrp8cpFLOjImM-NDisZXaKJbfIye2l1ZdGLvwwn0V2Sj7TWr0-2mXMz12keV8ishSu6PDttQi7WzcXeywMS9RKHizS6sGKhAnFqXrtPVn1ZHr3s2S_DcuYl5jKO6EHZvj_D7qgcbPY7h2ixx7LAXqJnVjzMyN8TJUPlFchIzcM3g",
  seraphiniteRing:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDDkdlj1dJUrmT6OolTN0JBkLqfSxY-IeVbO0DCJ1wHSkORz1BUNFWeYU1NogsSwzFOZ_XpbK_ekh2p_Et26IHCd-_-caf0lUORXDpOfGUJbAg4oJf95QHSYn5xdeXaUjJdkpQguCt9OPaBBL1ApVnW_HZ2esY-d9rjZNDlYWkKUYaCHeSzNfH1KFhwS64__7tpyzTSQArL5I2zKMmPhMp3WfjuLshx5LgwgomRZoxjRg4SNLTtp8xkrDcluXf3WufMOwFAR8GHIWA",
  resinBracelet:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAyr42dDl2D9wq4gnnaLd8u1rst3_A22Grk2tjc6i5OpoQKbPPDEoua1630qfjnKPJhFQ5w2XiLsddxmoVyme-lTR32DQ2TySGH-ahKMH_ITBN6yAoLUfWDSM1hE2gWrbRVM54RAyZXnC4Vb1IGNvdPUSM5KjF8F_65S6uB7frFop1MlPCiPEaryCERdRgXNgT5LLKaH9u0_ocE-xegmvaaN37pILaMM4JD4SXL7vFWtAJ2dadX48WrmHJk8XgPRGqhWtgT3sewgSU",
  set:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAaz2xPduHXUMZ9R3kP_-KW9ghzzybQjonG2RqmQ7yqgxvDrXLSdoRtsjytufk0S-HIS5yLrcxTyYYANBI5alRrHc60o_TdgFgyozjqHbd0Khy-RLanyk06ar8MlxYBMrPqmyGh-7wcUN6J3imAIm6JPkdVVjLPKYMsa2ds5pn4HzhFcZIGsQ7LhpjpWB0fhxk2abD6bmBVBoLKvdh8IpIQNFVn-lHQ9k6JYnfwZurH2yiSuDD2p_uv9erxglpCjx3P_FazlA400DQ"
};

const productImages = {
  verdant:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC5TVz97ieIgHwgUwt9qZglM5kSn76nEHa9B6Wi6tgADoqQdZ2KRZLtHCyHoF6fOAsH_e97xzQpI9tWVQKPLE8S5qOcmBAkH5kS2Erwvsx5CEPV_9qCy7P1F1OcNy4oXQrdkGlo-YhNZ-GbxKhTW-V_h8jW47dVnNcnuLWsjNUvTW1yK2Ig8bAct2eJZyyfs3W7DfGcATjaLTtSIwteS0HxQpzuPCrKWbAdCJJZLN7gSHx0AGw7X1uHW-Kr20RcCcIKsQi0V8TIoJA",
  verdantTexture:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAgZj7ye9kr1e_idELouIbTP2Qveg0KMb45tyiRAwC9Vncd8ItVCvpXWyyvEZzNCyd_JCJ0jNe8ZzZStiBndUoxNvVQkdD9Bb5PrmERpsYX4Oc3tDZ8MPkjL8L8JWx8L8SdodMVnWBorwiNi8bqJUHO1oTxWp91FGI2VXAb_fXt5VV_i8c4q116dJG2CJu4K2oyP5dXeO3rruABHWx12HKOkfCXoh0ZfHma8nXd9KFLYBXLRlByeqiS5jUNvzA01CYzvIcnmOtsl1A",
  verdantSide:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBl1HZGyDbPOGxzsVou_hIFD_jOJBy-OuKvNh3osRx5-CEl7X1eCt1vFbP8dAeXRXSWtEjY1oUkfu69nAEi4Itc5CRpLhjPZZyCDPlgzLmBBnm70wHdFS-BvDvjr0xQyDfwPFYCNj7UXBytvm8h288tpagPDT0mxDSa0raKeNI-796TTGraa-T6KSU32nJyG45uefPIYrtCKYRaOj-HKa5RC_nhHqc_Mj4GhjPJRv5Pm2V2eD4mD1IOlgMscGu9LZLGlRZg4hKfeIk",
  workshop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCA_hPWIg3VzgaP2g5OgeylK3MVJcSBG0WXRm28xTv9-f0-ILFifUEMFg3mN-8KzyWZcOKmMFnwYaM_LL75b_uFjFw58p5GNGkf1SbkK_-J-q_y8V40w0N05HQq7dYXrx2RKNoqdmGtzm4Sd3MEIBZhrK9e-KqFJjpEeIB8tbTmF68uvG90ttgsdrUJn36IyQX-xroDMewlwqt5IasqFW_LtW5olsgGYIR4f_KuzHKmsgWvPI2evMOGCGJFRfxgv84LaSOJqFeE2AY"
};

const productSeed: Product[] = [
  {
    slug: "verdant-soul-pendant",
    name: "Подвеска «Зеленая душа»",
    collection: "Единственный камень",
    category: "necklaces",
    stones: ["malachite"],
    materials: ["recycled-gold", "gold"],
    moods: ["protection", "grounding"],
    price: 124000,
    available: true,
    isNew: true,
    featuredRank: 1,
    image: productImages.verdant,
    gallery: [
      productImages.verdant,
      productImages.verdantTexture,
      productImages.verdantSide,
      productImages.workshop
    ],
    alt: "Зеленая подвеска в резной золотой оправе",
    shortDescription:
      "Малахитовый талисман в переработанном золоте, собранный вокруг природного рисунка камня.",
    story:
      "Камень найден в старой уральской коллекции и три года ждал оправы. Мастер сохранил его естественную асимметрию, чтобы украшение выглядело как артефакт, а не как серийная форма.",
    meaning:
      "Малахит считают камнем защиты и внутреннего равновесия. Его природные кольца напоминают о медленном росте, терпении и внимательности к себе.",
    specs: [
      "Переработанное желтое золото 18К",
      "Натуральный малахит, 2.4 ct",
      "Цепь 45 см с регулировкой",
      "Вес 8.2 г"
    ],
    care:
      "Протирайте мягкой сухой тканью. Не используйте ультразвуковую чистку и агрессивную химию."
  },
  {
    slug: "forest-whisper-bracelet",
    name: "Браслет «Лесной шепот»",
    collection: "Stones of Power",
    category: "bracelets",
    stones: ["malachite"],
    materials: ["gold", "recycled-gold"],
    moods: ["grounding"],
    price: 24500,
    available: true,
    isNew: true,
    featuredRank: 2,
    image: catalogImages.malachitePendant,
    gallery: [catalogImages.malachitePendant, productImages.verdantTexture],
    alt: "Малахит в золотой оправе на темной поверхности",
    shortDescription:
      "Лаконичный браслет с глубоким зеленым камнем и мягким золотым сиянием.",
    story:
      "Украшение собрано вокруг фрагмента малахита с редким контрастным рисунком.",
    meaning:
      "Для тех, кому нужен предмет-заземление в ежедневном ритуале.",
    specs: ["Позолота 18К", "Малахит", "Регулируемый размер"],
    care: "Храните отдельно от твердых камней и снимайте перед водой."
  },
  {
    slug: "sea-foam-necklace",
    name: "Колье «Морская пена»",
    collection: "Pearl Silence",
    category: "necklaces",
    stones: ["pearl"],
    materials: ["gold"],
    moods: ["clarity", "celebration"],
    price: 32000,
    available: true,
    isNew: false,
    featuredRank: 3,
    image: catalogImages.pearlNecklace,
    gallery: [catalogImages.pearlNecklace],
    alt: "Жемчужное колье на тонкой золотой цепи",
    shortDescription:
      "Барочная жемчужина на почти невесомой золотой линии.",
    story: "Создано как тихий акцент для открытой шеи и вечернего света.",
    meaning: "Жемчуг в этой коллекции отвечает за спокойствие и ясность.",
    specs: ["Барочный жемчуг", "Позолота 18К", "Длина 42 см"],
    care: "Надевайте после парфюма и храните в мягком мешочке."
  },
  {
    slug: "mountain-breath-ring",
    name: "Перстень «Дыхание гор»",
    collection: "Mountain Line",
    category: "rings",
    stones: ["seraphinite"],
    materials: ["silver", "recycled-silver"],
    moods: ["protection"],
    price: 18900,
    available: true,
    isNew: false,
    featuredRank: 4,
    image: catalogImages.seraphiniteRing,
    gallery: [catalogImages.seraphiniteRing],
    alt: "Серебряный перстень с темным камнем",
    shortDescription: "Массивный перстень с серфинитом и резной шинкой.",
    story: "Форма вдохновлена горными породами и старинными печатками.",
    meaning: "Серфинит связывают с защитой и вниманием к телу.",
    specs: ["Переработанное серебро", "Серфинит", "Размер 17.5"],
    care: "Полируйте серебро специальной салфеткой без абразивов."
  },
  {
    slug: "frozen-time-bracelet",
    name: "Браслет «Застывшее время»",
    collection: "Resin Archives",
    category: "bracelets",
    stones: ["citrine"],
    materials: ["eco-resin", "gold"],
    moods: ["celebration"],
    price: 15500,
    available: true,
    isNew: false,
    featuredRank: 5,
    image: catalogImages.resinBracelet,
    gallery: [catalogImages.resinBracelet],
    alt: "Золотистые включения внутри прозрачной эко-смолы",
    shortDescription: "Эко-смола с золотистыми включениями и теплым цитрином.",
    story: "Браслет сохраняет впечатление минерала, застывшего в янтарном свете.",
    meaning: "Цитрин добавляет ощущение движения, тепла и смелости.",
    specs: ["Эко-смола", "Цитрин", "Гипоаллергенная фурнитура"],
    care: "Не оставляйте под прямым солнцем на долгое время."
  },
  {
    slug: "eden-echo-ring",
    name: "Кольцо «Эхо Эдема»",
    collection: "Garden Relics",
    category: "rings",
    stones: ["garnet"],
    materials: ["silver"],
    moods: ["ritual"],
    price: 89000,
    available: true,
    isNew: true,
    featuredRank: 6,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDydRSfYvFN4mpLRHmP6IZ6nNMjKK6b9uqhvLxGCEOfCfKGN2yAgYj_9ZJKXiHKgJSFDBz3iGK4BtiyRjEMlwq1CsGM8mnn0F5WfdeyzbCcKn9DnO9ADTqnS10mV_YFMDNcFCb31b592G_q-uUGH2IsP1dzlGmaEH4bvW9nX1f97ltF2FzVT5cRE0WGRuCMqkdocKECIewC-dCPLFJX9-xE0-oyMrWTHlE4i3CSn3bcgjZfCGU5Wi1VrcCwa4tMWVeEjNujgvwqjdU",
    gallery: [],
    alt: "Кольцо с глубоким гранатом в серебре",
    shortDescription: "Гранат в серебряном венце с мягким винным оттенком.",
    story: "Кольцо собрано как маленькая реликвия сада после дождя.",
    meaning: "Гранат отвечает за внутренний огонь и собранность.",
    specs: ["Серебро", "Гранат", "Размер 18"],
    care: "Избегайте контакта с хлором и храните отдельно."
  },
  {
    slug: "verdant-studs",
    name: "Серьги «Зеленые знаки»",
    collection: "Daily Relics",
    category: "earrings",
    stones: ["quartz"],
    materials: ["gold"],
    moods: ["clarity"],
    price: 65000,
    available: false,
    isNew: false,
    featuredRank: 7,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjfwch_kzT9ml0zKFq3qV-YNnbVdKDLxzEYdwM4CdT7FrN2Rsl04jhitOC4tlVV3-ZxdM4OdHQ1Ughn47xIbwj3qpjg1TO-Zela9dYZxJXdVSxfrct82TiZNhgTAj2M2JZa6qpVk4_WbDIkH8xJeVSWyrDfLQ-eCf_puiHbwRdpBtanfxeozdiXUpx3IQ1tMIhqfyvJBXhN5DKkCYNNX93dnBHKXcRg0vRp_HztsH8DmyCOJRoDh6e9oCCA0MHYMsK0UyvYuV39x0",
    gallery: [],
    alt: "Длинные серьги с голубовато-зеленым камнем",
    shortDescription: "Легкие серьги на каждый день с природным рисунком кварца.",
    story: "Созданы как пара тихих вертикалей рядом с лицом.",
    meaning: "Кварц вносит ясность и ощущение чистого воздуха.",
    specs: ["Позолота", "Кварц", "Пара"],
    care: "Протирайте после носки сухой тканью."
  },
  {
    slug: "amethyst-path-pendant",
    name: "Подвеска «Аметистовый путь»",
    collection: "Night Minerals",
    category: "necklaces",
    stones: ["amethyst"],
    materials: ["silver"],
    moods: ["ritual", "protection"],
    price: 140000,
    available: true,
    isNew: false,
    featuredRank: 8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDw8Y2DPBOitJBrDIpphCkfEThAOzBnemKmN5fKSXhw5pmMHl1YxiBn5YloGl1OLCvL92Zehi38V2BcPNMvax7VeKLtCwSDJWusdoihRE2XU1B-CY-ICDwV3mj1Sl-vSn-81Dqq8zzWvFPIrHUrZAiKZ7BSXUnQurZMMceGlKsZ2vO3JnnShTqaSfocJr8AykluzoHgVBwnaO0HxfYMhK16JEGGxIRATzT4OH5cSgIARkHrgU-Ggc5igXygQQydDWFZYHr22FWrS_0",
    gallery: [],
    alt: "Подвеска с темным аметистом на черном фоне",
    shortDescription: "Темная подвеска с аметистом для вечерних ритуалов.",
    story: "Собрана вокруг кристалла с естественной полостью.",
    meaning: "Аметист связывают с вниманием, тишиной и защитой сна.",
    specs: ["Серебро", "Аметист", "Цепь 50 см"],
    care: "Не храните рядом с более твердыми камнями."
  }
];

export const products: Product[] = productSeed.map((product) => ({
  ...product,
  gallery: product.gallery.length > 0 ? product.gallery : [product.image]
}));

export const collections: Collection[] = [
  {
    slug: "stones-of-power",
    title: "Stones of Power",
    description:
      "Предметы с выразительным камнем в центре композиции: малахит, серфинит, аметист.",
    image: catalogImages.set
  },
  {
    slug: "pearl-silence",
    title: "Pearl Silence",
    description: "Жемчуг, золото и спокойные линии для света вокруг лица.",
    image: catalogImages.pearlNecklace
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const product = getProductBySlug(slug);

  if (!product) {
    return [];
  }

  return products
    .filter((candidate) => candidate.slug !== slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === product.category) +
        left.stones.filter((stone) => product.stones.includes(stone)).length;
      const rightScore =
        Number(right.category === product.category) +
        right.stones.filter((stone) => product.stones.includes(stone)).length;

      return rightScore - leftScore || left.featuredRank - right.featuredRank;
    })
    .slice(0, limit);
}
