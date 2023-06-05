package lookIT.lookITspring.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lookIT.lookITspring.entity.Collections;
import lookIT.lookITspring.security.JwtProvider;
import lookIT.lookITspring.service.Photo4CutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/collections")
@RequiredArgsConstructor
public class Photo4cutController {

    private final Photo4CutService photo4CutService;

    @GetMapping("/4cutphoto")
    public String PhotoFrame(@RequestParam("landmarkId") Long landmarkId) throws Exception {
        return photo4CutService.getPhotoFrame(landmarkId);
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Autowired
    private AmazonS3 s3Client;

    private final JwtProvider jwtProvider;

    @PostMapping("/4cutphoto")
    public Long uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("landmarkId") Long landmarkId,
            @RequestHeader("token") String token
    ) throws IOException {
        Long userId = jwtProvider.getUserId(token);


        String fileName = file.getOriginalFilename();
        String folderName = "photo4cut/photo";
        LocalDateTime now = LocalDateTime.now();
        String nowTime = now.toString();

        String key = folderName + "/" + fileName + nowTime;
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());

        PutObjectRequest request = new PutObjectRequest(bucket, key, file.getInputStream(), metadata);
        request.setCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(request);

        String imageUrl = s3Client.getUrl(bucket, key).toString();
        if (imageUrl == null) {
            System.out.println("S3 Err - s3Client is null");
            throw new Error("S3 Err - s3Client is null");
        }
        else{
            return photo4CutService.savePhoto4Cut(landmarkId, userId, imageUrl, key);
        }

    }

    @GetMapping("")
    public List<Collections> MyMemory4Cut(@RequestHeader("token") String token) throws Exception {
        Long userId = jwtProvider.getUserId(token);
        return photo4CutService.getCollectionsByUserId(userId);
    }

    @GetMapping("/{tagId}")
    public List<Collections> FriendMemory4Cut(@PathVariable("tagId") String tagId) throws Exception {
        return photo4CutService.getCollectionsByTagId(tagId);
    }

    @PostMapping("/tag")
    public String TagPhoto4Cut(@RequestBody String[] friendsList, @RequestParam Long photo4CutId){
        return photo4CutService.collectionFriendTag(friendsList, photo4CutId);
    }

    @GetMapping("/taggedFriendList")
    @ResponseBody
    public List<Map<String, String>> getTaggedFriendListByPhoto4CutIdId(@RequestParam Long photo4CutId){
        return photo4CutService.getTaggedFriendListByPhoto4CutIdId(photo4CutId);
    }

    @DeleteMapping("/4CutPhotoDelete")
    public boolean deleteTag(@RequestParam Long photo4CutId){
        return photo4CutService.Photo4CutDelete(photo4CutId);
    }
}

