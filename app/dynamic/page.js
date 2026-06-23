"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.dynamic = 'force-dynamic';
function DynamicPage() {
    return (<main style={{ padding: '2rem' }}>
      <h1>Dynamic (SSR)</h1>
      <p>Server-rendered on every request — no cache interaction.</p>
      <p>Current time: {new Date().toISOString()}</p>
    </main>);
}
exports.default = DynamicPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsT0FBTyxHQUFHLGVBQWUsQ0FBQztBQUV2QyxTQUF3QixXQUFXO0lBQ2pDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUMvQjtNQUFBLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQ3JCO01BQUEsQ0FBQyxDQUFDLENBQUMsd0RBQXdELEVBQUUsQ0FBQyxDQUM5RDtNQUFBLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNoRDtJQUFBLEVBQUUsSUFBSSxDQUFDLENBQ1IsQ0FBQztBQUNKLENBQUM7QUFSRCw4QkFRQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBkeW5hbWljID0gJ2ZvcmNlLWR5bmFtaWMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEeW5hbWljUGFnZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8bWFpbiBzdHlsZT17eyBwYWRkaW5nOiAnMnJlbScgfX0+XG4gICAgICA8aDE+RHluYW1pYyAoU1NSKTwvaDE+XG4gICAgICA8cD5TZXJ2ZXItcmVuZGVyZWQgb24gZXZlcnkgcmVxdWVzdCDigJQgbm8gY2FjaGUgaW50ZXJhY3Rpb24uPC9wPlxuICAgICAgPHA+Q3VycmVudCB0aW1lOiB7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfTwvcD5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXX0=