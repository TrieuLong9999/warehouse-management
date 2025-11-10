## dừng container nếu đang chạy và xóa container cũ và xóa image cũ
docker stop warehouse-management || true 
docker rm -f warehouse-management || true    

## pull github repo
git checkout main
git pull origin main

## build docker image
docker build -t warehouse-management .

## run docker image
docker run -d -p 4568:80 --name warehouse-management warehouse-management
