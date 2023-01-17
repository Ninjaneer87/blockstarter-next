import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { FormFieldProps } from '@/components/shared/FormField';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EventIcon from '@mui/icons-material/Event';
import PhotoIcon from '@mui/icons-material/Photo';
import SavingsIcon from '@mui/icons-material/Savings';
import WidgetsIcon from '@mui/icons-material/Widgets';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { CampaignFieldName } from '@/components/features/new-campaign/CampaignForm';

export const navItems = [
  {
    label: 'campaigns',
    icon: <WidgetsIcon fontSize="large" />,
    path: '/campaigns',
    exact: false,
  },
  {
    label: 'profile',
    icon: <SettingsAccessibilityIcon fontSize="large" />,
    path: '/profile',
    exact: false,
  },
  {
    label: 'donated',
    icon: <VolunteerActivismIcon fontSize="large" />,
    path: '/donated',
    exact: false,
  },
  {
    label: 'create',
    icon: <CampaignIcon fontSize="large" />,
    path: '/create',
    exact: true,
  },
  {
    label: 'manual',
    icon: <PsychologyAltIcon fontSize="large" />,
    path: '/manual',
    exact: true,
  },
];

type CampaignFormItem = Omit<FormFieldProps<CampaignFieldName>, "error">;
export const campaignFormItems: CampaignFormItem[] = [
  {
    name: 'title',
    label: 'Campaign title *',
    type: 'text',
    placeholder: 'Write a title',
    icon: <FormatQuoteIcon color='primary' />,
  },
  {
    name: 'target',
    label: 'Target amount *',
    placeholder: 'GOR 0.5',
    type: 'number',
    icon: <SavingsIcon color='primary' />,
  },
  {
    name: 'story',
    label: 'Story *',
    placeholder: 'Write your story',
    icon: <SubtitlesIcon color='primary' />,
    multiline: true,
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