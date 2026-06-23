"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const server_1 = require("next/server");
async function GET() {
    return server_1.NextResponse.json({
        status: 'ok',
        nextVersion: 14,
        timestamp: new Date().toISOString(),
    });
}
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBMkM7QUFFcEMsS0FBSyxVQUFVLEdBQUc7SUFDdkIsT0FBTyxxQkFBWSxDQUFDLElBQUksQ0FBQztRQUN2QixNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFBRSxFQUFFO1FBQ2YsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0tBQ3BDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFORCxrQkFNQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICBzdGF0dXM6ICdvaycsXG4gICAgbmV4dFZlcnNpb246IDE0LFxuICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9KTtcbn1cbiJdfQ==