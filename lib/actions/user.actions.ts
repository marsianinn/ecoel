"use server";
import{FilterQuery,SortOrder}from"mongoose";
import{revalidatePath}from"next/cache";
import Community from"../models/community.model";
import Thread from"../models/thread.model";
import User from"../models/user.model";
import{connectToDB}from"../mongoose";
export async function fetchUser(userId:string){
try{
connectToDB();
return await User.findOne({id:userId}).populate({
path:"communities",model:Community,strictPopulate:false,});}catch(error){
throw new Error(`Failed to fetch user:${error}`);}}
interface Params{
userId:string;
username:string;
name:string;
bio:string;
image:string;
path:string;
verif:boolean;}
export async function updateUser({
userId,bio,name,path,username,image,}:Params):Promise<void>{
try{
connectToDB();
await User.findOneAndUpdate(
{id:userId},{
username:username.toLowerCase(),name,bio,image,onboarded:true,},{upsert:true}
);
if(path==="/profile/edit"){
revalidatePath(path);}}catch(error){
throw new Error(`Failed to create/update user:${error}`);}}
export async function fetchUserPosts(userId:string){
try{
connectToDB();
const threads=await User.findOne({id:userId,isAnonym:false}).populate({
path:"threads",model:Thread,populate:[{
path:"children",model:Thread,populate:{
path:"author",model:User,select:"name image id",},},],});
return threads;}catch(error){
console.error("Error fetching user threads:",error);
throw error;}}
export async function fetchUsers({
userId,searchString="",pageNumber=1,pageSize=10,sortBy="desc",}:{
userId:string;
searchString?:string;
pageNumber?:number;
pageSize?:number;
sortBy?:SortOrder;}){
try{
connectToDB();
const skipAmount=(pageNumber-1) * pageSize;
const regex=new RegExp(searchString,"i");
const query:FilterQuery<typeof User>={
id:{$ne:userId},};
if(searchString.trim() !==""){
query.$or=[
{username:{$regex:regex}},{name:{$regex:regex}},];}
const sortOptions={createdAt:sortBy};
const usersQuery=User.find(query)
.sort(sortOptions)
.skip(skipAmount)
.limit(pageSize);
const totalUsersCount=await User.countDocuments(query);
const users=await usersQuery.exec();
const isNext=totalUsersCount > skipAmount + users.length;
return{users,isNext};}catch(error){
console.error("Error fetching users:",error);
throw error;}}
export async function getActivity(userId:string){
try{
connectToDB();
const userThreads=await Thread.find({author:userId});
const childThreadIds=userThreads.reduce((acc,userThread)=>{
return acc.concat(userThread.children);},[]);
const replies=await Thread.find({
_id:{$in:childThreadIds},author:{$ne:userId},}).populate({
path:"author",model:User,select:"name image _id",});
return replies;}catch(error){
console.error("Error fetching replies:",error);
throw error;}}