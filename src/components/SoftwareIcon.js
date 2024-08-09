import React from 'react';
import { SvgIcon, Tooltip } from '@mui/joy';

import { ReactComponent as ReactIcon } from '../assets/icons/React.svg';
import { ReactComponent as NodeIcon } from '../assets/icons/Node.js.svg';
import { ReactComponent as AfterEffectsIcon } from '../assets/icons/After Effects.svg';
import { ReactComponent as PhotoshopIcon } from '../assets/icons/Photoshop.svg';
import { ReactComponent as PremiereProIcon } from '../assets/icons/Premiere Pro.svg';
import { ReactComponent as FigmaIcon } from '../assets/icons/Figma.svg';
import { ReactComponent as D3Icon } from '../assets/icons/D3.svg';

const iconComponents = {
  'React': ReactIcon,
  'Node.js': NodeIcon,
  'After Effects': AfterEffectsIcon,
  'Photoshop': PhotoshopIcon,
  'Premiere Pro': PremiereProIcon,
  'Figma': FigmaIcon,
  'D3': D3Icon,
};

const SoftwareIcon = ({ name, ...props }) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon not found for: ${name}`);
    return null;
  }

  return (
    <Tooltip title={name} variant="outlined">
      <SvgIcon {...props} color="inherit">
        <IconComponent />
      </SvgIcon>
    </Tooltip>
  );
};

export default SoftwareIcon;