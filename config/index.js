const config = {
    port: process.env.PORT || 8000,
    local_client_app: process.env.LOCAL_CLIENT_APP || 'http://localhost:3000',
    remote_client_app: process.env.REMOTE_CLIENT_APP || 'https://report-system-one.vercel.app',
    allowedDomains: (() => {
      const localClient = process.env.LOCAL_CLIENT_APP || 'http://localhost:3000';
      const remoteClient = process.env.REMOTE_CLIENT_APP || 'https://report-system-one.vercel.app';
      const localServerAPI = process.env.LOCAL_SERVER_API || 'http://localhost:8000';
      const remoteServerAPI = process.env.REMOTE_SERVER_API || 'https://report-system-backend.up.railway.app';
  
      if (process.env.NODE_ENV === 'production') {
        return [remoteClient, remoteServerAPI];
      } else {
        return [localClient, localServerAPI];
      }
    })(),
  };
  
  module.exports = config;
  