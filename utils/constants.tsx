import CampaignIcon from '@mui/icons-material/Campaign';
import WindowIcon from '@mui/icons-material/Window';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { FormFieldProps } from '@/components/shared/FormField';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import BadgeIcon from '@mui/icons-material/Badge';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EventIcon from '@mui/icons-material/Event';
import PhotoIcon from '@mui/icons-material/Photo';
import SavingsIcon from '@mui/icons-material/Savings';
import { CampaignFieldName } from '@/components/features/new-campaign/CampaignForm';

export const navItems = [
  {
    label: 'all campaigns',
    icon: <WindowIcon fontSize="large" />,
    path: '/',
    exact: true,
  },
  {
    label: 'my campaigns',
    icon: <SettingsAccessibilityIcon fontSize="large" />,
    path: '/my-campaigns',
    exact: false,
  },
  {
    label: 'new campaign',
    icon: <CampaignIcon fontSize="large" />,
    path: '/new-campaign',
    exact: true,
  },
  {
    label: 'how to use',
    icon: <PsychologyAltIcon fontSize="large" />,
    path: '/manual',
    exact: true,
  },
];

type CampaignFormItem = Omit<FormFieldProps<CampaignFieldName>, "error">;
export const campaignFormItems: CampaignFormItem[] = [
  {
    name: 'fullname',
    label: 'Your name *',
    type: 'text',
    placeholder: 'John Doe',
    icon: <BadgeIcon color='primary' />,
  },
  {
    name: 'title',
    label: 'Campaign title *',
    type: 'text',
    placeholder: 'Write a title',
    icon: <FormatQuoteIcon color='primary' />,
  },
  {
    name: 'story',
    label: 'Story *',
    placeholder: 'Write your story',
    icon: <SubtitlesIcon color='primary' />,
    multiline: true,
  },
  {
    name: 'target',
    label: 'Target amount (ETH) *',
    placeholder: 'ETH 0.5',
    type: 'number',
    icon: <SavingsIcon color='primary' />,
  },
  {
    name: 'deadline',
    label: 'End date *',
    icon: <EventIcon color='primary' />,
  },
  {
    name: 'image',
    label: 'Campaign image *',
    type: 'text',
    placeholder: 'Place image URL',
    icon: <PhotoIcon color='primary' />,
  }
]