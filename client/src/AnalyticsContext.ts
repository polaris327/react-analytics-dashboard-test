import React, { createContext, useContext } from 'react';
import { SocketService } from './SocketService';

export const AnalyticsContext: React.Context<SocketService> = createContext(new SocketService());

// functional component context hook
export const useAnalytics = () => useContext(AnalyticsContext);
