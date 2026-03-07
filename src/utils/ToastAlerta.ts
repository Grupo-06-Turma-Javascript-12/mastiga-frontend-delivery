import { toast } from 'react-toastify';

const baseStyle = {
  background: 'linear-gradient(135deg, #15803d, #166534)',
  color: '#fff',
  borderRadius: '14px',
  fontWeight: 600,
  fontSize: '15px',
  boxShadow: '0 8px 32px rgba(21,128,61,0.35)',
  padding: '14px 20px',
}

const errorStyle = {
  background: 'linear-gradient(135deg, #b91c1c, #991b1b)',
  color: '#fff',
  borderRadius: '14px',
  fontWeight: 600,
  fontSize: '15px',
  boxShadow: '0 8px 32px rgba(185,28,28,0.35)',
  padding: '14px 20px',
}

const infoStyle = {
  background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
  color: '#fff',
  borderRadius: '14px',
  fontWeight: 600,
  fontSize: '15px',
  boxShadow: '0 8px 32px rgba(29,78,216,0.35)',
  padding: '14px 20px',
}

const commonOptions = {
  position: 'top-right' as const,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
}

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {

    case 'sucesso':
      toast.success(mensagem, {
        ...commonOptions,
        style: baseStyle,
      });
      break;

    case 'erro':
      toast.error(mensagem, {
        ...commonOptions,
        style: errorStyle,
      });
      break;

    case 'info':
    default:
      toast.info(mensagem, {
        ...commonOptions,
        style: infoStyle,
      });
      break;
  }
}