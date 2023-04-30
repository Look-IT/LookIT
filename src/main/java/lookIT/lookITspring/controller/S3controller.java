package lookIT.lookITspring.controller;

import com.amazonaws.services.s3.AmazonS3;
//import lookIT.lookITspring.service.S3Uploader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//@RequiredArgsConstructor
//@Controller
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class S3controller{
    //private final S3Uploader s3Uploader;

    //@GetMapping("/")
    //public String index() {
    //    return "index";
    //}

    //@PostMapping("/upload")
    //@ResponseBody
    //public String upload(@RequestParam("data") MultipartFile multipartFile) throws IOException {
    //    return s3Uploader.upload(multipartFile, "memoryphoto");
    //}
    private final lookIT.lookITspring.service.firstService firstService;

    public S3controller(lookIT.lookITspring.service.firstService firstService) {
        this.firstService = firstService;
    }

    @GetMapping("/first")
    public Map<String, Object> firstController(){
        return firstService.getFirstData();
    }
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    //private String S3Bucket = bucket; // Bucket 이름

    @Autowired
    private AmazonS3 s3Client;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {

        String fileName = file.getOriginalFilename();
        String folderName = "memoryphoto";
        String key = folderName + "/" + fileName;
        System.out.println(key);
        //ObjectMetadata metadata = new ObjectMetadata();
        //metadata.setContentType(file.getContentType());

        //PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
        //request.setCannedAcl(CannedAccessControlList.PublicRead);
        //s3Client.putObject(request);

        //String imageUrl = s3Client.getUrl(bucket, key).toString();
        return key;
    }
}
