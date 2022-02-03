import request from "../../source/request.js";

export default async (client, not = []) => {
    
    let notStr = "0;";
    for (let i = 0; i < not.length; i++)  notStr += String(not[i])+";";
    notStr = notStr.substring(0, notStr.length-1);

    let res = await request({
        service:     "actions",
        function:    "getActiveActions",
        cliente:     client.slug,
        action_slug: "likeAndRetweet",
        not:         notStr
    })

    if(res.json.error) return false;
    return res.json.data;

}