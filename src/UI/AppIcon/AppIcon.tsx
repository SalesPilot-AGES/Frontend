import type { TIconName } from '@declarations';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import SaveIcon from '@mui/icons-material/Save';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import type { JSX } from 'react';

export const GetAppIcon = (name: TIconName): JSX.Element => {
  switch (name) {
    case 'logo':
      return <ElectricBoltIcon />;
    case 'dashboard':
      return <DashboardIcon />;
    case 'company':
      return <ApartmentIcon />;
    case 'manager':
      return <ManageAccountsIcon />;
    case 'salesman':
      return <PersonIcon />;
    case 'meeting':
      return <EventNoteIcon />;
    case 'duration':
      return <AccessTimeIcon />;
    case 'sentimentSad':
      return <SentimentVeryDissatisfiedIcon />;
    case 'sentimentNeutral':
      return <SentimentNeutralIcon />;
    case 'sentimentHappy':
      return <SentimentSatisfiedAltIcon />;
    case 'login':
      return <LoginIcon />;
    case 'logout':
      return <LogoutIcon />;
    case 'close':
      return <CloseIcon />;
    case 'save':
      return <SaveIcon />;
    case 'real_estate_agent':
      return <RealEstateAgentIcon />;
    case 'sentimentSad':
      return <SentimentDissatisfiedIcon />;
    case 'sentimentNeutral':
      return <SentimentNeutralIcon />;
    case 'sentimentHappy':
      return <SentimentSatisfiedIcon />;
    default:
      return <ElectricBoltIcon />;
  }
};
