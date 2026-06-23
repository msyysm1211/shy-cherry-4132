"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const server_1 = require("next/server");
const cache_1 = require("next/cache");
async function POST(request) {
    const tag = request.nextUrl.searchParams.get('tag');
    const path = request.nextUrl.searchParams.get('path');
    if (!tag && !path) {
        return server_1.NextResponse.json({
            error: 'Provide tag or path param. Example: ?tag=time-data or ?path=/revalidate-demo',
        }, { status: 400 });
    }
    const results = [];
    if (tag) {
        (0, cache_1.revalidateTag)(tag);
        results.push(`revalidated tag: "${tag}"`);
    }
    if (path) {
        (0, cache_1.revalidatePath)(path);
        results.push(`revalidated path: "${path}"`);
    }
    return server_1.NextResponse.json({
        success: true,
        message: results.join('; '),
        timestamp: new Date().toISOString(),
    });
}
exports.POST = POST;
async function GET() {
    return server_1.NextResponse.json({
        usage: 'POST to trigger revalidation',
        examples: [
            'POST /api/revalidate?tag=time-data',
            'POST /api/revalidate?path=/revalidate-demo',
        ],
    });
}
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0Q7QUFDeEQsc0NBQTJEO0FBRXBELEtBQUssVUFBVSxJQUFJLENBQUMsT0FBb0I7SUFDN0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV0RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2pCLE9BQU8scUJBQVksQ0FBQyxJQUFJLENBQ3RCO1lBQ0UsS0FBSyxFQUNILDhFQUE4RTtTQUNqRixFQUNELEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUNoQixDQUFDO0tBQ0g7SUFFRCxNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFFN0IsSUFBSSxHQUFHLEVBQUU7UUFDUCxJQUFBLHFCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsQ0FBQztLQUMzQztJQUVELElBQUksSUFBSSxFQUFFO1FBQ1IsSUFBQSxzQkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLElBQUksR0FBRyxDQUFDLENBQUM7S0FDN0M7SUFFRCxPQUFPLHFCQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzNCLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtLQUNwQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0JELG9CQStCQztBQUVNLEtBQUssVUFBVSxHQUFHO0lBQ3ZCLE9BQU8scUJBQVksQ0FBQyxJQUFJLENBQUM7UUFDdkIsS0FBSyxFQUFFLDhCQUE4QjtRQUNyQyxRQUFRLEVBQUU7WUFDUixvQ0FBb0M7WUFDcEMsNENBQTRDO1NBQzdDO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELGtCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IHJldmFsaWRhdGVUYWcsIHJldmFsaWRhdGVQYXRoIH0gZnJvbSAnbmV4dC9jYWNoZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHRhZyA9IHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMuZ2V0KCd0YWcnKTtcbiAgY29uc3QgcGF0aCA9IHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMuZ2V0KCdwYXRoJyk7XG5cbiAgaWYgKCF0YWcgJiYgIXBhdGgpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7XG4gICAgICAgIGVycm9yOlxuICAgICAgICAgICdQcm92aWRlIHRhZyBvciBwYXRoIHBhcmFtLiBFeGFtcGxlOiA/dGFnPXRpbWUtZGF0YSBvciA/cGF0aD0vcmV2YWxpZGF0ZS1kZW1vJyxcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcblxuICBpZiAodGFnKSB7XG4gICAgcmV2YWxpZGF0ZVRhZyh0YWcpO1xuICAgIHJlc3VsdHMucHVzaChgcmV2YWxpZGF0ZWQgdGFnOiBcIiR7dGFnfVwiYCk7XG4gIH1cblxuICBpZiAocGF0aCkge1xuICAgIHJldmFsaWRhdGVQYXRoKHBhdGgpO1xuICAgIHJlc3VsdHMucHVzaChgcmV2YWxpZGF0ZWQgcGF0aDogXCIke3BhdGh9XCJgKTtcbiAgfVxuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgc3VjY2VzczogdHJ1ZSxcbiAgICBtZXNzYWdlOiByZXN1bHRzLmpvaW4oJzsgJyksXG4gICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgIHVzYWdlOiAnUE9TVCB0byB0cmlnZ2VyIHJldmFsaWRhdGlvbicsXG4gICAgZXhhbXBsZXM6IFtcbiAgICAgICdQT1NUIC9hcGkvcmV2YWxpZGF0ZT90YWc9dGltZS1kYXRhJyxcbiAgICAgICdQT1NUIC9hcGkvcmV2YWxpZGF0ZT9wYXRoPS9yZXZhbGlkYXRlLWRlbW8nLFxuICAgIF0sXG4gIH0pO1xufVxuIl19