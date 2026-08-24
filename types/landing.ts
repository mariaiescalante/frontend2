export interface HeroSectionContent {
  tag: string
  title: string
  boldIntro: string
  description: string
  ctaText: string
  ctaUrl: string
  systemTag: string
  designTag: string
  heroImageUrl?: string
}

export interface StatsSectionContent {
  projectsCount: string
  projectsLabel: string
  clientsCount: string
  clientsLabel: string
  yearsCount: string
  yearsLabel: string
}

export interface ClientLogo {
  id: string
  companyName: string
  logoUrl?: string
  websiteUrl?: string
}

export interface ClientsSectionContent {
  tag: string
  titlePart1: string
  titleBold1: string
  titlePart2: string
  titleBold2: string
  titlePart3: string
  description: string
  items: ClientLogo[]
}

export interface ServiceItem {
  id: string
  title: string
  kicker: string
  description: string
  deliverables: string[]
  result: string
}

export interface ServicesSectionContent {
  tag: string
  titlePart1: string
  titleBold: string
  description: string
  items: ServiceItem[]
}

export interface FeatureItem {
  id: string
  title: string
  kicker: string
  imageUrl?: string
}

export interface FeaturesSectionContent {
  tag: string
  titlePart1: string
  titleBold1: string
  titlePart2: string
  titleBold2: string
  description: string
  items: FeatureItem[]
}

export interface AboutSectionContent {
  tag: string
  titlePart1: string
  titleBold: string
  titlePart2: string
  description: string
  missionTag: string
  missionTitle: string
  missionDesc: string
  visionTag: string
  visionTitle: string
  visionDesc: string
}

export interface TechItem {
  id: string
  name: string
  category: string
  description: string
  usageCase: string
  logoUrl?: string
}

export interface TechStackSectionContent {
  tag: string
  titlePart1: string
  titleBold: string
  description: string
  items: TechItem[]
}

export interface ReviewItem {
  id: string
  clientName: string
  tag: string
  comment: string
  rating: number
}

export interface RatingsSectionContent {
  tag: string
  titlePart1: string
  titleBold: string
  description: string
  score: string
  verifiedLabel: string
  items: ReviewItem[]
}

export interface ContactSectionContent {
  tag: string
  titlePart1: string
  titlePart2: string
  ctaText: string
  whatsappNumber: string
  whatsappDefaultMessage: string
  contactEmail: string
  tagline: string
  rights: string
  timezone: string
}

export interface CustomSectionItem {
  id: string
  navLabel: string
  showInNavbar: boolean
  tag: string
  titlePart1: string
  titleBold: string
  titlePart2: string
  description: string
  content?: string
  imageUrl?: string
  ctaText?: string
  ctaUrl?: string
}

export interface BlogPageContent {
  heroTag: string
  heroTitlePart1: string
  heroTitleItalic: string
  heroDescription: string
  recentTag: string
  recentTitlePart1: string
  recentTitleItalic: string
  recentTitlePart2: string
}

export interface FaqPageContent {
  heroTag: string
  heroBadge: string
  heroTitlePart1: string
  heroTitleItalic: string
  heroDescription: string
}

export interface FullLandingContent {
  hero: HeroSectionContent
  stats: StatsSectionContent
  clients: ClientsSectionContent
  services: ServicesSectionContent
  features: FeaturesSectionContent
  about: AboutSectionContent
  techStack: TechStackSectionContent
  ratings: RatingsSectionContent
  contact: ContactSectionContent
  customSections?: CustomSectionItem[]
  blog?: BlogPageContent
  faq?: FaqPageContent
}

export type LandingPageContent = FullLandingContent
export type TestimonialItem = ReviewItem
export type ContactInfoContent = ContactSectionContent
