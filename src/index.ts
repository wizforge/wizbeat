/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * For more information, visit: https://github.com/Parthh191/wizbeat
 */

export { trackRequest } from "./pulseTracker";
export { startPulse } from "./reporter";
export { middleware } from "./middleware";
export { default as wizbeat, WizBeat } from "./wizbeat";

// For CommonJS default export compatibility
import wizbeat from "./wizbeat";
export default wizbeat;
